import React from 'react';

import GasStation from '@fuels/domain/entities/gas_station';
import { styles } from '@fuels/presentation/components/GasStationRouteData/data/styles';
import { useGasStationRouteData } from '@fuels/presentation/redux/selectors/routes_data';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const RouteDataComponent: React.FC<{
  readonly station: GasStation;
}> = ({ station }) => {
  const { t } = useTranslation();
  const { distance, duration } = useGasStationRouteData(station);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>
          {t('distance_value', {
            value: numbro(distance).format({
              mantissa: 2,
              trimMantissa: false,
            }),
          })}
        </Text>
        <Text style={styles.subtitle}>{t('distance')}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>
          {t('travel_duration_value', {
            value: numbro(duration).format({
              mantissa: 2,
              trimMantissa: false,
            }),
          })}
        </Text>
        <Text style={styles.subtitle}>{t('travel_duration')}</Text>
      </View>
    </View>
  );
};

export default RouteDataComponent;
