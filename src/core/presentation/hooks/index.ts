import { useEffect, useRef, useState } from 'react';

import { EARTH_RADIUS_IN_METERS } from '@core/domain/entities/earth';
import EdgeCoordinates from '@core/domain/entities/edge_coordinates';
import Location from '@core/domain/entities/location';
import { Dimensions, ScaledSize } from 'react-native';

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

// Function to calculate latitude and longitude offsets
const calculateOffsets = (
  location: Location,
  distance: number,
): { readonly latitudeOffset: number; readonly longitudeOffset: number } => {
  const radians = 180 / Math.PI;
  const degress = Math.PI / 180;

  const offset = distance / EARTH_RADIUS_IN_METERS;

  const latitudeOffset = offset * radians;

  const longitudeOffset =
    latitudeOffset / Math.cos(degress * location.latitude);

  return {
    latitudeOffset,
    longitudeOffset,
  };
};

// Function to calculate north, south, east, and west coordinates
export const calculateEdgeCoordinates = (
  location: Location,
  radius: number,
): EdgeCoordinates => {
  const { latitudeOffset, longitudeOffset } = calculateOffsets(
    location,
    radius,
  );

  const { latitude, longitude } = location;

  const north: Location = {
    latitude: latitude + latitudeOffset,
    longitude,
  };

  const south: Location = {
    latitude: latitude - latitudeOffset,
    longitude,
  };

  const east: Location = {
    latitude,
    longitude: longitude + longitudeOffset,
  };

  const west: Location = {
    latitude,
    longitude: longitude - longitudeOffset,
  };

  return { north, south, east, west };
};
