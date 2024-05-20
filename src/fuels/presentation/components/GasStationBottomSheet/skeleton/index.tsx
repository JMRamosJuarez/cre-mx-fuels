import React, { useMemo } from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import { useDimensions } from '@core/presentation/hooks';
import GasPriceItemSkeleton from '@fuels/presentation/components/GasPriceItemSkeleton';
import { styles } from '@fuels/presentation/components/GasStationBottomSheet/skeleton/styles';
import { useAppTheme } from '@theme/index';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const GasStationSkeleton: React.FC = () => {
  const { boxShadow, colors } = useAppTheme();

  const prices = useMemo(() => new Array(3).fill({}), []);

  const {
    screen: { width },
  } = useDimensions();

  return (
    <View
      style={[
        styles.container,
        boxShadow,
        { backgroundColor: colors.primary['50'] },
      ]}>
      <Skeleton width={width - 24} height={18} style={styles.title} />
      <View style={styles.header}>
        <Skeleton width={100} height={14} style={styles.subtitle} />
        <Skeleton width={100} height={14} style={styles.subtitle} />
      </View>
      <View style={styles.prices}>
        {prices.map((_, index) => {
          return <GasPriceItemSkeleton key={`${index}`} style={styles.price} />;
        })}
      </View>
      <View
        style={{
          backgroundColor: colors.primary['200'],
        }}>
        <Text style={styles.about}>
          {
            'Information provided by the CRE (COMISIÓN REGULADORA DE ENERGÍA). To know more go to '
          }
          <Text style={[styles.aboutLink, { color: colors.red['500'] }]}>
            {'datos.gob.mx'}
          </Text>
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          disabled
          activeOpacity={0.7}
          style={[styles.button, { backgroundColor: colors.blue['700'] }]}>
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
          disabled
          activeOpacity={0.7}
          style={[
            styles.button,
            styles.outlineButton,
            { borderColor: colors.blue['700'] },
          ]}>
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

export default GasStationSkeleton;
