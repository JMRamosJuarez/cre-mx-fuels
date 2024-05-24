import React, { useMemo } from 'react';

import Skeleton from '@core/presentation/components/Skeleton';
import GasPriceItemSkeleton from '@fuels/presentation/components/GasPriceItemSkeleton';
import { styles } from '@fuels/presentation/components/GasStationItemSkeleton/styles';
import RouteDataSkeleton from '@fuels/presentation/components/GasStationRouteData/skeleton';
import { useAppTheme } from '@theme/index';
import { Trans, useTranslation } from 'react-i18next';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Config } from 'react-native-config';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const GasStationItemSkeleton: React.FC<{
  readonly width: number;
}> = ({ width }) => {
  const { t } = useTranslation();

  const { boxShadow, colors } = useAppTheme();

  const prices = useMemo(() => new Array(3).fill({}), []);

  return (
    <View
      style={[
        styles.container,
        boxShadow,
        { width },
        { backgroundColor: colors.primary['50'] },
      ]}>
      <Skeleton width={width - 24} height={16} style={styles.skeleton} />
      <RouteDataSkeleton />
      <View style={styles.prices}>
        {prices.map((_, index) => {
          return <GasPriceItemSkeleton key={`${index}`} style={styles.price} />;
        })}
      </View>
      <TouchableOpacity
        disabled
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
          disabled
          activeOpacity={0.7}
          style={[styles.button, { backgroundColor: colors.blue['700'] }]}>
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
            {t('go')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GasStationItemSkeleton;
