import React, { useEffect, useRef } from 'react';

import { AnimatedTouch } from '@core/presentation/components/Animated';
import ToggleProps from '@core/presentation/components/Toggle/props';
import { styles } from '@core/presentation/components/Toggle/styles';
import { useAppTheme } from '@theme/index';
import { Animated } from 'react-native';

const Toggle: React.FC<ToggleProps> = ({ style, value, onPress }) => {
  const { colors } = useAppTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const positionX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primary['400'], colors.blue['700']],
  });

  const shadowOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, value]);

  return (
    <AnimatedTouch
      activeOpacity={0.6}
      onPress={() => onPress(value)}
      style={[
        styles.container,
        style,
        {
          backgroundColor,
        },
      ]}>
      <Animated.View
        style={[
          styles.bullet,
          {
            shadowOffset: {
              height: 1,
              width: shadowOffset,
            },
            transform: [{ translateX: positionX }],
          },
        ]}
      />
    </AnimatedTouch>
  );
};

export default Toggle;
