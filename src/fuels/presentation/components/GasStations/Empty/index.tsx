import React, { useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import { styles } from '@fuels/presentation/components/GasStations/Empty/styles';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const GasStationsEmpty: React.FC = () => {
  const { boxShadow, colors } = useAppTheme();

  const {
    screen: { width },
  } = useDimensions();

  const ITEM_WIDTH = useMemo(() => width - 32 - 16, [width]);

  return (
    <View
      style={[
        styles.container,
        boxShadow,
        { width: ITEM_WIDTH },
        { backgroundColor: colors.primary['50'] },
      ]}>
      <Text style={styles.message}>
        {'There are no gas stations in this area.'}
      </Text>
    </View>
  );
};

export default GasStationsEmpty;
