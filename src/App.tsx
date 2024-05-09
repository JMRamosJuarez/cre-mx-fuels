import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CoreComponentImpl from '@core/data/di/components/core_component_impl';
import CoreModuleImpl from '@core/data/di/modules/core_module_impl';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';
import { Text } from 'react-native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';

const module: CoreModule = new CoreModuleImpl();
const component: CoreComponent = new CoreComponentImpl(module);

const App: React.FC = () => {
  const [data, updateData] = useState<GasStation[]>([]);

  const location = useMemo<Location>(
    () => ({
      lat: 19.435185559866923,
      lng: -99.14121458306909,
    }),
    [],
  );

  const calculateDeltas = useCallback(
    (radius: number) => {
      if (data.length > 0) {
        const latitudes = data.map(({ location: { lat } }) => lat);
        const longitudes = data.map(({ location: { lng } }) => lng);

        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);

        const latitudeDelta = Math.abs(maxLat - minLat) * 1.2; // Adding some padding
        const longitudeDelta = Math.abs(maxLon - minLon) * 1.2; // Adding some padding
        return { latitudeDelta, longitudeDelta };
      }

      const LATITUDE_DELTA_PER_METER = 1 / (111 * 1000); // Approximation: 1 degree of latitude is about 111 kilometers (111 * 1000 meters)
      const LONGITUDE_DELTA_PER_METER =
        1 / (111 * 1000 * Math.cos((location.lat * Math.PI) / 180)); // Approximation: 1 degree of longitude varies with latitude

      const latitudeDelta = radius * 2 * LATITUDE_DELTA_PER_METER;
      const longitudeDelta = radius * 2 * LONGITUDE_DELTA_PER_METER;

      return { latitudeDelta, longitudeDelta };
    },
    [data, location.lat],
  );

  const getStations = useCallback(async () => {
    try {
      const { getGasStationsUseCase } = component.gasStationsComponent;
      const stations = await getGasStationsUseCase.execute({
        distance: 2000,
        location,
      });
      console.log('STATIONS: ', stations.length);
      updateData(stations);
    } catch (error) {
      console.log('ERROR: ', JSON.stringify(error, null, '\t'));
    }
  }, [location]);

  const region = useMemo<Region>(() => {
    const deltas = calculateDeltas(2000);
    return {
      ...{ latitude: location.lat, longitude: location.lng },
      ...deltas,
    };
  }, [calculateDeltas, location]);

  useEffect(() => {
    getStations();
  }, [getStations]);

  return (
    <MapView style={{ flex: 1 }} region={region}>
      <Marker
        key={'my-location'}
        title={'My location'}
        pinColor={'blue'}
        coordinate={{ latitude: location.lat, longitude: location.lng }}
      />
      {data.map(station => {
        return (
          <Marker
            key={`${station.id}-${station.creId}`}
            coordinate={{
              latitude: station.location.lat,
              longitude: station.location.lng,
            }}>
            <Callout>
              <Text>{station.name}</Text>
              <Text>{`Distance: ${station.distance / 1000} Km.`}</Text>
              {station.prices.map(price => {
                return (
                  <Text
                    key={price.type}>{`${price.type}: ${price.price}`}</Text>
                );
              })}
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default App;
