import React from 'react';

import ProgressBarProps from '@core/presentation/components/ProgressBar/props';
import { styles } from '@core/presentation/components/ProgressBar/styles';
import { useAppTheme } from '@theme/index';
import { Text, View } from 'react-native';

const ProgressBar: React.FC<ProgressBarProps> = ({
  style,
  title,
  progress,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.progress, { backgroundColor: colors.primary['300'] }]}>
        <View
          style={[
            styles.bar,
            {
              width: `${progress * 100}%`,
              backgroundColor: colors.green['500'],
            },
          ]}
        />
      </View>
      <Text style={styles.title}>{title(progress)}</Text>
    </View>
  );
};

export default ProgressBar;
