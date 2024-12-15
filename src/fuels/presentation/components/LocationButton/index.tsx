import React, { useMemo } from 'react';

import Location from '@core/domain/entities/location';
import { styles } from '@fuels/presentation/components/LocationButton/styles';
import { useGetGasStationsMapRegionAction } from '@fuels/presentation/redux/actions';
import { useGasStationsMapRegionState } from '@fuels/presentation/redux/selectors/gas_stations_map_region';
import MaterialIcon from '@react-native-vector-icons/material-design-icons';
import { useAppTheme } from '@theme/index';
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const LocationButton: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
  readonly onLocation: (origin: Location) => void;
}> = ({ style, onLocation }) => {
  const { boxShadow, colors } = useAppTheme();

  const state = useGasStationsMapRegionState();

  const isLoading = useMemo(
    () => state === 'waiting' || state === 'loading',
    [state],
  );

  const getRegion = useGetGasStationsMapRegionAction();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      style={[
        style,
        boxShadow,
        styles.button,
        { backgroundColor: colors.primary['50'] },
      ]}
      onPress={async () => {
        const { origin } = await getRegion();
        onLocation(origin);
      }}>
      {isLoading ? (
        <ActivityIndicator size={24} color={colors.blue['700']} />
      ) : (
        <MaterialIcon color={colors.blue['700']} size={24} name={'target'} />
      )}
    </TouchableOpacity>
  );
};

export default LocationButton;
