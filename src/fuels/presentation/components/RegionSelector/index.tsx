import React, { useMemo, useState } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import { styles } from '@fuels/presentation/components/RegionSelector/styles';
import { useGasStationsMapRegionState } from '@fuels/presentation/redux/selectors/gas_stations_map_region';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';
import { PanResponder, StyleProp, Text, View, ViewStyle } from 'react-native';

const RegionSelector: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
  readonly start: number;
  readonly maxRadius: number;
  readonly updateRegion: (radius: number) => void;
}> = ({ style, start, maxRadius, updateRegion }) => {
  const { t } = useTranslation();

  const { colors } = useAppTheme();

  const {
    screen: { width },
  } = useDimensions();

  const barWidth = useMemo(() => width - 48 - 32, [width]);

  const state = useGasStationsMapRegionState();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => state !== 'loading',
        onMoveShouldSetPanResponder: () => state !== 'loading',
        onPanResponderMove: (_, { moveX }) => {
          const percentage = (moveX - 32) / barWidth;
          const round = Math.round(percentage * 100) / 100; // Round to 2 decimal places
          const value = Math.max(0.1, Math.min(round, 1));
          updateProgress(value);
        },
        onPanResponderRelease: (_, { moveX }) => {
          const percentage = (moveX - 32) / barWidth;
          const round = Math.round(percentage * 100) / 100; // Round to 2 decimal places
          const value = Math.max(0.1, Math.min(round, 1));
          updateRegion(value * maxRadius);
        },
      }),
    [maxRadius, barWidth, state, updateRegion],
  );

  const [progress, updateProgress] = useState<number>(start);

  return (
    <View
      style={[
        style,
        styles.container,
        { backgroundColor: colors.primary['50'] },
      ]}
      {...panResponder.panHandlers}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barBackground,
            {
              backgroundColor: colors.primary['300'],
            },
          ]}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.green['400'],
              },
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.progressIndicator,
            {
              borderColor: colors.green['800'],
              backgroundColor: colors.primary['50'],
            },
            {
              start: barWidth * progress + 8,
            },
          ]}
        />
      </View>
      <Text style={styles.label}>
        {t('area_of', {
          value: numbro((progress * maxRadius) / 1000).format({
            mantissa: 2,
            trimMantissa: false,
            thousandSeparated: true,
          }),
        })}
      </Text>
    </View>
  );
};

export default RegionSelector;
