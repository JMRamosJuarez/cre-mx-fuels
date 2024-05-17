import React, { useEffect } from 'react';

import GasStationsProgressBar from '@fuels/presentation/components/GasStationsProgressBar';
import PricesProgressBar from '@fuels/presentation/components/PricesProgressBar';
import { useDownloadDataAction } from '@fuels/presentation/redux/actions';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

const DownloadProcess: React.FC = () => {
  const downloadData = useDownloadDataAction();

  useEffect(() => {
    downloadData();
  }, [downloadData]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LottieView
        style={{ flex: 1, margin: 24 }}
        source={require('@assets/animations/searching-locations.json')}
        autoPlay
        loop
      />
      <GasStationsProgressBar />
      <PricesProgressBar />
    </View>
  );
};

export default DownloadProcess;
