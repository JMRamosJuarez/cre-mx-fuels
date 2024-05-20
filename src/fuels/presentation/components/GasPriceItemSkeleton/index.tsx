import React, { useMemo } from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import { useDimensions } from '@core/presentation/hooks';
import { styles } from '@fuels/presentation/components/GasPriceItemSkeleton/styles';
import { useAppTheme } from '@theme/index';
import { StyleProp, View, ViewStyle } from 'react-native';

const GasPriceItemSkeleton: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const { colors } = useAppTheme();

  const {
    screen: { width },
  } = useDimensions();

  const { dark, light } = useMemo(() => {
    return { dark: colors.primary['500'], light: colors.primary['400'] };
  }, [colors]);

  return (
    <View style={style}>
      <View style={[styles.typeContainer, { backgroundColor: dark }]}>
        <Skeleton width={width / 3 - 2 - 32} height={16} style={styles.type} />
      </View>
      <View style={[styles.data, { backgroundColor: light }]}>
        <Skeleton width={width / 3 - 2 - 32} height={16} style={styles.price} />
        <Skeleton
          width={(width / 3 - 2 - 32) / 2}
          height={14}
          style={styles.priceLabel}
        />
      </View>
    </View>
  );
};

export default GasPriceItemSkeleton;
