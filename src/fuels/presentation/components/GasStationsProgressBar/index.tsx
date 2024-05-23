import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';

const GasStationsProgressBar: React.FC = () => {
  const progress = useExecutionProgress('stations');
  return (
    <ProgressBar
      style={{ marginHorizontal: 24, marginVertical: 12 }}
      title={p => `Processing gas stations: ${p}%`}
      progress={progress}
    />
  );
};

export default GasStationsProgressBar;
