import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { styles } from '@fuels/presentation/components/PricesProgressBar/styles';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';

const PricesProgressBar: React.FC = () => {
  const progress = useExecutionProgress('prices');
  return (
    <ProgressBar
      style={styles.container}
      title={p => `Processing prices: ${p}%`}
      progress={progress}
    />
  );
};

export default PricesProgressBar;
