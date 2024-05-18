import { useCallback, useEffect, useRef, useState } from 'react';

import { Dimensions, ScaledSize } from 'react-native';
import { Region } from 'react-native-maps';

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });
  const onChange = useRef(
    (request: { readonly window: ScaledSize; readonly screen: ScaledSize }) => {
      setDimensions(request);
    },
  ).current;
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, [onChange]);
  return dimensions;
};

export const useRegionMapper = () => {
  return useCallback(
    ({
      zoom = 1.2,
      latitudes,
      longitudes,
    }: {
      readonly zoom?: number;
      readonly latitudes: number[];
      readonly longitudes: number[];
    }): Region => {
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      const latitude = (minLat + maxLat) / 2;
      const longitude = (minLng + maxLng) / 2;

      const distanceLat = maxLat - minLat;
      const distanceLng = maxLng - minLng;

      const latitudeDelta = distanceLat * zoom; // Adjust factor as needed
      const longitudeDelta = distanceLng * zoom; // Adjust factor as needed

      return { latitude, longitude, latitudeDelta, longitudeDelta };
    },
    [],
  );
};
