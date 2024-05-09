import React, { useCallback, useMemo } from 'react';

import Location from '@core/domain/entities/location';
import { useDimensions } from '@core/presentation/hooks';
import MapView, { Marker, Region } from 'react-native-maps';

const App: React.FC = () => {
  const {
    screen: { width, height },
  } = useDimensions();

  const location = useMemo<Location>(
    () => ({
      lat: 19.435185559866923,
      lng: -99.14121458306909,
    }),
    [],
  );

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

  return (
    <MapView style={{ flex: 1 }} region={region}>
      <Marker
        coordinate={{ latitude: location.lat, longitude: location.lng }}
      />
    </MapView>
  );
};

export default App;
