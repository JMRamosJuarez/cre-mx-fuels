import React from 'react';

import GasStationRoute from '@fuels/domain/entities/gas_station_route';
import GasPriceItem from '@fuels/presentation/components/GasPriceItem';
import { styles } from '@fuels/presentation/components/GasStationBottomSheet/data/styles';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { useGasStationData } from '@fuels/presentation/redux/selectors/station';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Config } from 'react-native-config';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const GasStationData: React.FC<{
  readonly displayRoute: (route: GasStationRoute) => void;
}> = ({ displayRoute }) => {
  const { boxShadow, colors } = useAppTheme();

  const region = useMapRegion();

  const { distance, duration, station } = useGasStationData();

  return (
    <View
      style={[
        styles.container,
        boxShadow,
        { backgroundColor: colors.primary['50'] },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: colors.primary['900'],
          },
        ]}>
        {station.name}
      </Text>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {'Distance: '}
          <Text style={styles.subtitleData}>{`${numbro(distance).format({
            mantissa: 2,
            trimMantissa: false,
          })} Km.`}</Text>
        </Text>
        <Text style={styles.subtitle}>
          {'Travel duration: '}
          <Text style={styles.subtitleData}>{`${numbro(duration).format({
            mantissa: 2,
            trimMantissa: false,
          })} min.`}</Text>
        </Text>
      </View>
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
            if (region) {
              displayRoute({
                station,
                origin: region.location,
                destination: station.location,
              });
            }
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
          onPress={() => {
            if (region) {
              const url = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelmode=driving&origin=${region.location.latitude},${region.location.longitude}&destination=${station.location.latitude},${station.location.longitude}`;
              Linking.openURL(url);
            }
          }}>
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

export default GasStationData;
