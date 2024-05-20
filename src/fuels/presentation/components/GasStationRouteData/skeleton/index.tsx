import React from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import { styles } from '@fuels/presentation/components/GasStationRouteData/skeleton/styles';
import { Text, View } from 'react-native';

const RouteDataSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Skeleton width={80} height={14} style={styles.title} />
        <Text style={styles.subtitle}>{'Distance'}</Text>
      </View>
      <View style={styles.item}>
        <Skeleton width={80} height={14} style={styles.title} />
        <Text style={styles.subtitle}>{'Travel duration'}</Text>
      </View>
    </View>
  );
};

export default RouteDataSkeleton;
