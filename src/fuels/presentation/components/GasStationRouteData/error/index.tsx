import React from 'react';

import { styles } from '@fuels/presentation/components/GasStationRouteData/error/styles';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const RouteDataError: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>
          {t('distance_value', { value: '--.--' })}
        </Text>
        <Text style={styles.subtitle}>{t('distance')}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>
          {t('trave_duration_value', { value: '--.--' })}
        </Text>
        <Text style={styles.subtitle}>{t('travel_duration')}</Text>
      </View>
    </View>
  );
};

export default RouteDataError;
