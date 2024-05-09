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

  const region = useMemo<Region>(() => {
    if (data.length > 0) {
      const latitudes = data.map(place => place.location.lat);
      const longitudes = data.map(place => place.location.lng);

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latitude = (minLat + maxLat) / 2;
      const longitude = (minLng + maxLng) / 2;

      const distanceLat = maxLat - minLat;
      const distanceLng = maxLng - minLng;

      const latitudeDelta = distanceLat * 1.2; // Adjust factor as needed
      const longitudeDelta = distanceLng * 1.2; // Adjust factor as needed

      return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };
    }

    return {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };
  }, [data, location.lat, location.lng]);

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
