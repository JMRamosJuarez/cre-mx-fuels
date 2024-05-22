import React, { useMemo } from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import { styles } from '@fuels/presentation/components/GasPriceItemSkeleton/styles';
import { useAppTheme } from '@theme/index';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

const GasPriceItemSkeleton: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const { colors } = useAppTheme();

  const { dark, light } = useMemo(() => {
    return { dark: colors.primary['600'], light: colors.primary['500'] };
  }, [colors]);

  return (
    <View style={style}>
      <View
        style={[
          {
            marginVertical: 0.5,
            padding: 8,
          },
          { backgroundColor: dark },
        ]}>
        <Skeleton
          width={80}
          height={16}
          style={{ alignSelf: 'center', marginVertical: 3 }}
        />
      </View>
      <View style={[styles.data, { backgroundColor: light }]}>
        <Skeleton
          width={80}
          height={16}
          style={{ alignSelf: 'center', marginVertical: 3 }}
        />
        <Text style={[styles.priceLabel, { color: colors.primary['50'] }]}>
          {'Per liter'}
        </Text>
      </View>
    </View>
  );
};

export default GasPriceItemSkeleton;
