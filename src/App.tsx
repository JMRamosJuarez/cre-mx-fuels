import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import CoreComponentImpl from '@core/data/di/components/core_component_impl';
import CoreModuleImpl from '@core/data/di/modules/core_module_impl';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';
import numbro from 'numbro';
import { Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const module: CoreModule = new CoreModuleImpl();
const component: CoreComponent = new CoreComponentImpl(module);

const App: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const [data, updateData] = useState<GasStation[]>([]);

  const currentLocation = useMemo<Location>(
    () => ({
      lat: 19.435185559866923,
      lng: -99.14121458306909,
    }),
    [],
  );

  const getStations = useCallback(async () => {
    try {
      const { getGasStationsUseCase } = component.gasStationsComponent;
      const stations = await getGasStationsUseCase.execute({
        distance: 2000,
        location: currentLocation,
      });

      const latitudes = stations.map(place => place.location.lat);
      const longitudes = stations.map(place => place.location.lng);

      const minLat = Math.min(...latitudes, currentLocation.lat);
      const maxLat = Math.max(...latitudes, currentLocation.lat);
      const minLng = Math.min(...longitudes, currentLocation.lng);
      const maxLng = Math.max(...longitudes, currentLocation.lng);

      const latitude = (minLat + maxLat) / 2;
      const longitude = (minLng + maxLng) / 2;

      const distanceLat = maxLat - minLat;
      const distanceLng = maxLng - minLng;

      const latitudeDelta = distanceLat * 1.2; // Adjust factor as needed
      const longitudeDelta = distanceLng * 1.2; // Adjust factor as needed

      mapRef.current?.animateToRegion(
        { latitude, longitude, latitudeDelta, longitudeDelta },
        750,
      );

      updateData(stations);
    } catch (error) {
      console.log('ERROR: ', JSON.stringify(error, null, '\t'));
    }
  }, [currentLocation]);

  useEffect(() => {
    getStations();
  }, [getStations]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      region={{
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}>
      <Marker
        key={'my-location'}
        title={'My location'}
        pinColor={'blue'}
        coordinate={{
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
        }}
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
              <Text>{`Distance: ${numbro(station.distance / 1000).format({
                mantissa: 2,
                trimMantissa: false,
              })} Km.`}</Text>
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
