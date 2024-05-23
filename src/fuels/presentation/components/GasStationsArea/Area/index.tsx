import React from 'react';

import {
  useGasStationsAreaRadius,
  useIsGasStationsAreaVisible,
} from '@fuels/presentation/redux/selectors/area';
import { useLocation } from '@fuels/presentation/redux/selectors/location';
import { useAppTheme } from '@theme/index';
import { Text } from 'react-native';
import { Callout, Circle, Marker } from 'react-native-maps';

const Area: React.FC = () => {
  const { colors } = useAppTheme();

  const origin = useLocation();

  const visible = useIsGasStationsAreaVisible();

  const radius = useGasStationsAreaRadius();

  return (
    <>
      <Marker
        key={'my-location'}
        pinColor={colors.blue['500']}
        coordinate={origin}>
        <Callout>
          <Text>{'My location'}</Text>
        </Callout>
      </Marker>
      {visible && (
        <Circle
          center={origin}
          radius={radius}
          strokeWidth={1}
          strokeColor={colors.blue['500']}
          fillColor={'rgba(230,238,255,0.5)'}
        />
      )}
    </>
  );
};

export default Area;
