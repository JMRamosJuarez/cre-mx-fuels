import React from 'react';

import { useDisplayGasStationAreaAction } from '@fuels/presentation/redux/actions';
import { useIsGasStationsAreaVisible } from '@fuels/presentation/redux/selectors/area';
import { useAppTheme } from '@theme/index';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AreaToggle: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const { boxShadow, colors } = useAppTheme();
  const visible = useIsGasStationsAreaVisible();
  const display = useDisplayGasStationAreaAction();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        style,
        boxShadow,
        { backgroundColor: colors.primary['50'] },
        { padding: 8, borderRadius: 40 },
      ]}
      onPress={() => display(!visible)}>
      <MaterialIcon
        color={colors.blue['700']}
        size={24}
        name={visible ? 'map-marker-radius' : 'map-marker-radius-outline'}
      />
    </TouchableOpacity>
  );
};

export default AreaToggle;
