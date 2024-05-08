import React, { useCallback, useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import MapView, { Marker, Region } from 'react-native-maps';

const App: React.FC = () => {
  const coordinates = useMemo(
    () => ({
      longitude: -99.14121458306909,
      latitude: 19.435185559866923,
    }),
    [],
  );

  const {
    screen: { width, height },
  } = useDimensions();

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
    const deltas = calculateDeltas(15.75);
    return { ...deltas, ...coordinates };
  }, [calculateDeltas, coordinates]);

  return (
    <MapView style={{ flex: 1 }} initialRegion={region}>
      <Marker coordinate={coordinates} title={'Palacio de Bellas Artes'} />
    </MapView>
  );
};

export default App;
