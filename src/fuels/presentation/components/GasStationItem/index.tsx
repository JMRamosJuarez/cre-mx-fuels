import React, { useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationRoute from '@fuels/domain/entities/gas_station_route';
import GasPriceItem from '@fuels/presentation/components/GasPriceItem';
import { styles } from '@fuels/presentation/components/GasStationItem/styles';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { useAppTheme } from '@theme/index';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Config } from 'react-native-config';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const GasStationItem: React.FC<{
  readonly station: GasStation;
  readonly displayRoute: (route: GasStationRoute) => void;
}> = ({ station, displayRoute }) => {
  const {
    screen: { width },
  } = useDimensions();

  const region = useMapRegion();

  const itemWidth = useMemo(() => width - 16 - 32, [width]);

  const { boxShadow, colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        boxShadow,
        { width: itemWidth },
        { backgroundColor: colors.primary['50'] },
      ]}
      onLayout={({ nativeEvent: { layout } }) => {
        console.log('SIZE: ', layout.height);
      }}>
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
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.itemSubtitle}>{'--.-- Km.'}</Text>
          <Text style={styles.itemTitle}>{'Distance'}</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.itemSubtitle}>{'--.-- min.'}</Text>
          <Text style={styles.itemTitle}>{'Travel duration'}</Text>
        </View>
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
