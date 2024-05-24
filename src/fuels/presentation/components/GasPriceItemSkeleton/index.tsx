import React, { useMemo } from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import { styles } from '@fuels/presentation/components/GasPriceItemSkeleton/styles';
import { useAppTheme } from '@theme/index';
import { useTranslation } from 'react-i18next';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

const GasPriceItemSkeleton: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const { t } = useTranslation();

  const { colors } = useAppTheme();

  const { dark, light } = useMemo(() => {
    return { dark: colors.primary['600'], light: colors.primary['500'] };
  }, [colors]);

  return (
    <View style={style}>
      <View style={[styles.title, { backgroundColor: dark }]}>
        <Skeleton width={80} height={16} style={styles.skeleton} />
      </View>
      <View style={[styles.data, { backgroundColor: light }]}>
        <Skeleton width={80} height={16} style={styles.skeleton} />
        <Text style={[styles.priceLabel, { color: colors.primary['50'] }]}>
          {t('per_liter')}
        </Text>
      </View>
    </View>
  );
};

export default GasPriceItemSkeleton;
