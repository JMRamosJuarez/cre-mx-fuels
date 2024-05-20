import React, { useEffect, useRef } from 'react';

import { AnimatedSvg } from '@core/presentation/components/Animated';
import SkeletonProps from '@core/presentation/components/Skeleton/props';
import { styles } from '@core/presentation/components/Skeleton/styles';
import { useAppTheme } from '@theme/index';
import { Animated, Easing, View } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

const Skeleton: React.FC<SkeletonProps> = ({ width, height, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const { colors } = useAppTheme();

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: false,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [animatedValue]);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          {
            width,
            height,
          },
          styles.wrap,
        ]}>
        <Svg style={styles.skeleton}>
          <Defs>
            <LinearGradient
              id="solid-background"
              x1={'0%'}
              y1={'0%'}
              x2={'100%'}
              y2={'0%'}>
              <Stop
                offset={'100%'}
                stopColor={colors.primary['600']}
                stopOpacity="0"
              />
              <Stop
                offset={'0%'}
                stopColor={colors.primary['600']}
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={'100%'}
            height={'100%'}
            fill="url(#solid-background)"
          />
        </Svg>
        <AnimatedSvg style={[styles.skeleton, { transform: [{ translateX }] }]}>
          <Defs>
            <LinearGradient
              id="gradient-background"
              x1={'0%'}
              y1={'0%'}
              x2={'100%'}
              y2={'0%'}>
              <Stop
                offset={'0%'}
                stopColor={colors.primary['600']}
                stopOpacity="0.05"
              />
              <Stop
                offset={'50%'}
                stopColor={colors.primary['600']}
                stopOpacity="1"
              />
              <Stop
                offset={'100%'}
                stopColor={colors.primary['600']}
                stopOpacity="0.05"
              />
            </LinearGradient>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={'100%'}
            height={'100%'}
            fill="url(#gradient-background)"
          />
        </AnimatedSvg>
      </View>
    </View>
  );
};

export default Skeleton;
