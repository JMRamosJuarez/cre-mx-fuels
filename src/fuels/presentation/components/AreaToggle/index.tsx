import React from 'react';

import { styles } from '@fuels/presentation/components/AreaToggle/styles';
import { useDisplayGasStationAreaAction } from '@fuels/presentation/redux/actions';
import { useIsGasStationsAreaVisible } from '@fuels/presentation/redux/selectors/area';
import MaterialIcon from '@react-native-vector-icons/material-design-icons';
import { useAppTheme } from '@theme/index';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

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
        styles.button,
        { backgroundColor: colors.primary['50'] },
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
