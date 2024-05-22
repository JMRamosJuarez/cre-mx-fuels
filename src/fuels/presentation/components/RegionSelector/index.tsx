import React, { useMemo, useState } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import { styles } from '@fuels/presentation/components/RegionSelector/styles';
import { useMapRegionState } from '@fuels/presentation/redux/selectors/region';
import { useAppTheme } from '@theme/index';
import numbro from 'numbro';
import { PanResponder, StyleProp, Text, View, ViewStyle } from 'react-native';

const RegionSelector: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
  readonly start: number;
  readonly maxRadius: number;
  readonly updateRegion: (radius: number) => void;
}> = ({ style, start, maxRadius, updateRegion }) => {
  const { colors } = useAppTheme();

  const [progress, updateProgress] = useState<number>(start);

  const {
    screen: { width },
  } = useDimensions();

  const barWidth = useMemo(() => width - 48 - 32, [width]);

  const state = useMapRegionState();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => state !== 'loading',
        onMoveShouldSetPanResponder: () => state !== 'loading',
        onPanResponderMove: ({ nativeEvent: { locationX } }) => {
          const percentage = locationX / barWidth;
          const round = Math.round(percentage * 100) / 100; // Round to 2 decimal places
          if (round >= 0.1 && round <= 1) {
            updateProgress(round);
          }
        },
        onPanResponderRelease: ({ nativeEvent: { locationX } }) => {
          const percentage = locationX / barWidth;
          const round = Math.round(percentage * 100) / 100; // Round to 2 decimal places
          console.log('ROUND: ', round);
          if (round >= 0.1 && round <= 1) {
            updateRegion(round * maxRadius);
          }
        },
      }),
    [maxRadius, state, barWidth, updateRegion],
  );

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        style,
        styles.container,
        { backgroundColor: colors.primary['50'] },
      ]}>
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
        {`Area of ${numbro((progress * maxRadius) / 1000).format({
          mantissa: 2,
          trimMantissa: false,
          thousandSeparated: true,
        })} Km.`}
      </Text>
    </View>
  );
};

export default RegionSelector;
