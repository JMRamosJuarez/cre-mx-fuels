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
    (meters: number) => {
      const earthRadiusInMeters = 6378137; // Earth's radius is approximately 6371 kilometers
      const degreesPerRadian = 180 / Math.PI;
      const radiansPerDegree = Math.PI / 180;

      // Calculate the distance in degrees of latitude
      const deltaLat = (meters / earthRadiusInMeters) * degreesPerRadian;

      // Calculate the distance in degrees of longitude
      const deltaLon =
        (meters /
          (earthRadiusInMeters * Math.cos(location.lat * radiansPerDegree))) *
        degreesPerRadian;

      return { latitudeDelta: deltaLat, longitudeDelta: deltaLon };
    },
    [location.lat],
  );

  const getStations = useCallback(async () => {
    try {
      const { getGasStationsUseCase } = component.gasStationsComponent;
      const stations = await getGasStationsUseCase.execute({
        distance: 5000,
        location,
      });
      console.log('STATIONS: ', stations.length);
      updateData(stations);
    } catch (error) {
      console.log('ERROR: ', JSON.stringify(error, null, '\t'));
    }
  }, [location]);

  const region = useMemo<Region>(() => {
    const deltas = calculateDeltas(5000);
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
