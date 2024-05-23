import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';

const PricesProgressBar: React.FC = () => {
  const progress = useExecutionProgress('prices');
  return (
    <ProgressBar
      style={{ marginHorizontal: 24, marginVertical: 12 }}
      title={p => `Processing prices: ${p}%`}
      progress={progress}
    />
  );
};

export default PricesProgressBar;
