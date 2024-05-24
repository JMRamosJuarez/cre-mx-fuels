import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { styles } from '@fuels/presentation/components/GasStationsProgressBar/styles';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';

const GasStationsProgressBar: React.FC = () => {
  const progress = useExecutionProgress('stations');
  return (
    <ProgressBar
      style={styles.container}
      title={p => `Processing gas stations: ${p}%`}
      progress={progress}
    />
  );
};

export default GasStationsProgressBar;
