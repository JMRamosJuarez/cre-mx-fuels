import React, { useMemo } from 'react';

import GasPrice from '@fuels/domain/entities/gas_price';
import { styles } from '@fuels/presentation/components/GasPriceItem/styles';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

const GasPriceItem: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
  readonly price: GasPrice;
}> = ({ style, price: { type, price } }) => {
  const { t } = useTranslation();

  const { colors } = useAppTheme();

  const { dark, light } = useMemo(() => {
    switch (type) {
      case 'diesel':
        return { dark: colors.primary['800'], light: colors.primary['700'] };
      case 'premium':
        return { dark: colors.red['800'], light: colors.red['600'] };
      case 'regular':
        return { dark: colors.green['800'], light: colors.green['600'] };
      default:
        return { dark: colors.green['800'], light: colors.green['600'] };
    }
  }, [colors, type]);

  return (
    <View style={style}>
      <Text
        style={[
          styles.type,
          { backgroundColor: dark, color: colors.primary['50'] },
        ]}>
        {type.toUpperCase()}
      </Text>
      <View style={[styles.data, { backgroundColor: light }]}>
        <Text style={[styles.price, { color: colors.primary['50'] }]}>
          {`${numbro(price).formatCurrency({
            mantissa: 2,
            trimMantissa: false,
          })} MXN`}
        </Text>
        <Text style={[styles.priceLabel, { color: colors.primary['50'] }]}>
          {t('per_liter')}
        </Text>
      </View>
    </View>
  );
};

export default GasPriceItem;
