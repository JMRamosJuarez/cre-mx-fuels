import React from 'react';

import GasStation from '@fuels/domain/entities/gas_station';
import GasPriceItem from '@fuels/presentation/components/GasPriceItem';
import { styles } from '@fuels/presentation/components/GasStationItem/styles';
import GasStationRouteData from '@fuels/presentation/components/GasStationRouteData';
import { useAppTheme } from '@theme/index';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Config } from 'react-native-config';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const GasStationItem: React.FC<{
  readonly width: number;
  readonly station: GasStation;
  readonly displayRoute: (station: GasStation) => void;
}> = ({ width, station, displayRoute }) => {
  const { boxShadow, colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        boxShadow,
        { width },
        { backgroundColor: colors.primary['50'] },
      ]}>
      <Text
        numberOfLines={1}
        style={[
          styles.title,
          {
            color: colors.primary['900'],
          },
        ]}>
        {station.name}
      </Text>
      <GasStationRouteData station={station} />
      <View style={styles.prices}>
        {station.prices.map(price => {
          return (
            <GasPriceItem key={price.type} style={styles.price} price={price} />
          );
        })}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: colors.primary['200'],
        }}
        onPress={() => {
          Linking.openURL(Config.CRE_URL || '-');
        }}>
        <Text style={styles.about}>
          {
            'Information provided by the CRE (COMISIÓN REGULADORA DE ENERGÍA). To know more go to '
          }
          <Text style={[styles.aboutLink, { color: colors.red['500'] }]}>
            {'datos.gob.mx'}
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, { backgroundColor: colors.blue['700'] }]}
          onPress={() => {
            displayRoute(station);
          }}>
          <MaterialIcon
            color={colors.primary['50']}
            size={24}
            name={'directions'}
          />
          <Text style={[styles.buttonLabel, { color: colors.primary['50'] }]}>
            {'Show route'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.button,
            styles.outlineButton,
            { borderColor: colors.blue['700'] },
          ]}
          onPress={() => {}}>
          <MaterialIcon
            color={colors.blue['700']}
            size={24}
            name={'navigation'}
          />
          <Text style={[styles.buttonLabel, { color: colors.blue['700'] }]}>
            {'Go'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GasStationItem;
