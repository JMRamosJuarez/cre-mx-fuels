import React from 'react';

import { useAppTheme } from '@theme/index';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const LocationButton: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const { boxShadow, colors } = useAppTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        style,
        boxShadow,
        { backgroundColor: colors.primary['50'] },
        { padding: 8, borderRadius: 40 },
      ]}
      onPress={() => {}}>
      <MaterialIcon color={colors.blue['700']} size={24} name={'target'} />
    </TouchableOpacity>
  );
};

export default LocationButton;
