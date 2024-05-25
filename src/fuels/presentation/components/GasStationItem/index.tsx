import React from 'react';

import Location from '@core/domain/entities/location';
import GasStation from '@fuels/domain/entities/gas_station';
import GasPriceItem from '@fuels/presentation/components/GasPriceItem';
import { styles } from '@fuels/presentation/components/GasStationItem/styles';
import GasStationRouteData from '@fuels/presentation/components/GasStationRouteData';
import { useAppTheme } from '@theme/index';
import { Trans, useTranslation } from 'react-i18next';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Config } from 'react-native-config';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const GasStationItem: React.FC<{
  readonly width: number;
  readonly origin: Location;
  readonly station: GasStation;
  readonly displayRoute: (station: GasStation) => void;
}> = ({ width, origin, station, displayRoute }) => {
  const { t } = useTranslation();

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
          <Trans
            i18nKey={'information_provider'}
            components={{
              underline: (
                <Text
                  style={[styles.aboutLink, { color: colors.red['500'] }]}
                />
              ),
            }}
            values={{ url: 'datos.gob.mx' }}
          />
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
            {t('show_route')}
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
            const url = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&travelmode=driving&origin=${origin.latitude},${origin.longitude}&destination=${station.location.latitude},${station.location.longitude}`;
            Linking.openURL(url);
          }}>
          <MaterialIcon
            color={colors.blue['700']}
            size={24}
            name={'navigation'}
          />
          <Text style={[styles.buttonLabel, { color: colors.blue['700'] }]}>
            {t('go')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GasStationItem;
