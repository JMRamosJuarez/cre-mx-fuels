import React, { useEffect, useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import GasStationsProgressBar from '@fuels/presentation/components/GasStationsProgressBar';
import PricesProgressBar from '@fuels/presentation/components/PricesProgressBar';
import { styles } from '@fuels/presentation/pages/ProcessingData/styles';
import { useDownloadDataAction } from '@fuels/presentation/redux/actions';
import { useAppTheme } from '@theme/index';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const ProcessingData: React.FC = () => {
  const { t } = useTranslation();

  const downloadData = useDownloadDataAction();

  useEffect(downloadData, [downloadData]);

  const { colors } = useAppTheme();

  const {
    screen: { width, height },
  } = useDimensions();

  const aspectRadius = useMemo(
    () => Math.min(width, height) - 48,
    [width, height],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.primary['50'] }]}>
      <Text style={styles.title}>{t('processing_data_message')}</Text>
      <LottieView
        style={[
          styles.animation,
          { width: aspectRadius, height: aspectRadius },
        ]}
        source={require('@assets/animations/processing-data.json')}
        autoPlay
        loop
      />
      <GasStationsProgressBar />
      <PricesProgressBar />
    </View>
  );
};

export default ProcessingData;
