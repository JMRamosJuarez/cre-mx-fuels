import React from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import { styles } from '@fuels/presentation/components/GasStationRouteData/skeleton/styles';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const RouteDataSkeleton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Skeleton width={80} height={14} style={styles.title} />
        <Text style={styles.subtitle}>{t('distance')}</Text>
      </View>
      <View style={styles.item}>
        <Skeleton width={80} height={14} style={styles.title} />
        <Text style={styles.subtitle}>{t('travel_duration')}</Text>
      </View>
    </View>
  );
};

export default RouteDataSkeleton;
