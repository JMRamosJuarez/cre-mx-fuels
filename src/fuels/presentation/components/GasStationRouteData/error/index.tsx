import React from 'react';

import { styles } from '@fuels/presentation/components/GasStationRouteData/error/styles';
import { Text, View } from 'react-native';

const RouteDataError: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{'--.-- Km.'}</Text>
        <Text style={styles.subtitle}>{'Distance'}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>{'--.-- min.'}</Text>
        <Text style={styles.subtitle}>{'Travel duration'}</Text>
      </View>
    </View>
  );
};

export default RouteDataError;
