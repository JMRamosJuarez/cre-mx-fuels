import React from 'react';

import GasStationRoute from '@fuels/domain/entities/gas_station_route';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { useGasStationData } from '@fuels/presentation/redux/selectors/station';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

const GasStationData: React.FC<{
  readonly displayRoute: (route: GasStationRoute) => void;
}> = ({ displayRoute }) => {
  const { boxShadow: shadow, colors } = useAppTheme();

  const region = useMapRegion();

  const { distance, duration, station } = useGasStationData();

  return (
    <View
      style={[
        { position: 'absolute', start: 0, end: 0, bottom: 0 },
        shadow,
        { backgroundColor: colors.primary['50'] },
      ]}>
      <Text>{station.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>{`Distance: ${numbro(distance).format({
          mantissa: 2,
          trimMantissa: false,
        })} Km.`}</Text>
        <Text style={{ flex: 1 }}>{`Duration: ${numbro(duration).format({
          mantissa: 2,
          trimMantissa: false,
        })} min.`}</Text>
      </View>
      {station.prices.map(price => {
        return (
          <Text key={price.type}>
            {`${price.type}: ${numbro(price.price).formatCurrency({
              mantissa: 2,
              trimMantissa: false,
            })}`}
          </Text>
        );
      })}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ flex: 1, padding: 12 }}
          onPress={() => {
            if (region) {
              displayRoute({
                station,
                origin: region.location,
                destination: station.location,
              });
            }
          }}>
          <Text style={{ textAlign: 'center' }}>{'Show route'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ flex: 1, padding: 12 }}
          onPress={() => {
            if (region) {
              const url = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelmode=driving&origin=${region.location.latitude},${region.location.longitude}&destination=${station.location.latitude},${station.location.longitude}`;
              Linking.openURL(url);
            }
          }}>
          <Text style={{ textAlign: 'center' }}>{'Go'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GasStationData;
