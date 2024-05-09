import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CoreComponentImpl from '@core/data/di/components/core_component_impl';
import CoreModuleImpl from '@core/data/di/modules/core_module_impl';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import Location from '@core/domain/entities/location';
import { useDimensions } from '@core/presentation/hooks';
import GasStation from '@fuels/domain/entities/gas_station';
import { Text } from 'react-native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';

const module: CoreModule = new CoreModuleImpl();
const component: CoreComponent = new CoreComponentImpl(module);

const App: React.FC = () => {
  const {
    screen: { width, height },
  } = useDimensions();

  const [data, updateData] = useState<GasStation[]>([]);

  const location = useMemo<Location>(
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
        distance: 5000,
        location,
      });
      updateData(stations);
    } catch (error) {
      console.log('ERROR: ', JSON.stringify(error, null, '\t'));
    }
  }, [location]);

  const calculateDeltas = useCallback(
    (zoom: number) => {
      const scale = zoom / 1000;
      const aspectRatio = width / height;
      const latitudeDelta = scale / aspectRatio;
      const longitudeDelta = scale;
      return { latitudeDelta, longitudeDelta };
    },
    [height, width],
  );

  const region = useMemo<Region>(() => {
    const deltas = calculateDeltas(2.5);
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
            key={station.id}
            coordinate={{
              latitude: station.location.lat,
              longitude: station.location.lng,
            }}
            onPress={() => {
              console.log('PRICES: ', station.prices);
            }}>
            <Callout>
              <Text>{station.name}</Text>
              {station.prices.map(price => {
                return <Text>{`${price.type}: ${price.price}`}</Text>;
              })}
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default App;
