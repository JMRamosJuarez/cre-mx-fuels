import React, { useMemo } from 'react';

import GasStation from '@fuels/domain/entities/gas_station';
import { styles } from '@fuels/presentation/components/GasStationMark/styles';
import { useSelectedStation } from '@fuels/presentation/redux/selectors/station';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { Text, View } from 'react-native';

const GasStationMark: React.FC<{
  readonly station: GasStation;
}> = ({ station }) => {
  const { colors } = useAppTheme();

  const selected = useSelectedStation();

  const { dark, light } = useMemo(() => {
    switch (station.prices[0].type) {
      case 'diesel':
        return { dark: colors.primary['800'], light: colors.primary['700'] };
      case 'premium':
        return { dark: colors.red['800'], light: colors.red['600'] };
      case 'regular':
        return { dark: colors.green['900'], light: colors.green['600'] };
      default:
        return { dark: colors.green['900'], light: colors.green['600'] };
    }
  }, [colors.green, colors.primary, colors.red, station.prices]);

  const backgroundColor = useMemo(() => {
    return selected?.id === station.id ? light : dark;
  }, [selected?.id, station.id, dark, light]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            borderColor: dark,
          },
        ]}>
        <Text
          style={[
            {
              textAlign: 'center',
              fontWeight: 'bold',
            },
            {
              color: colors.primary['50'],
            },
          ]}>
          {numbro(station.prices[0].price).formatCurrency({
            mantissa: 2,
            trimMantissa: false,
          })}
        </Text>
      </View>
      <View style={[styles.indicator, { borderTopColor: backgroundColor }]} />
    </>
  );
};

export default GasStationMark;
