import React from 'react';

import GasStation from '@fuels/domain/entities/gas_station';
import { styles } from '@fuels/presentation/components/GasStationRouteData/data/styles';
import { useGasStationRouteData } from '@fuels/presentation/redux/selectors/routes_data';
import numbro from 'numbro';
import { Text, View } from 'react-native';

const RouteDataComponent: React.FC<{
  readonly station: GasStation;
}> = ({ station }) => {
  const { distance, duration } = useGasStationRouteData(station);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{`${numbro(distance).format({
          mantissa: 2,
          trimMantissa: false,
        })} Km.`}</Text>
        <Text style={styles.subtitle}>{'Distance'}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>{`${numbro(duration).format({
          mantissa: 2,
          trimMantissa: false,
        })} min.`}</Text>
        <Text style={styles.subtitle}>{'Travel duration'}</Text>
      </View>
    </View>
  );
};

export default RouteDataComponent;
