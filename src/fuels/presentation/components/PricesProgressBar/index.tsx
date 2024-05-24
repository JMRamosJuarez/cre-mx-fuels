import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { styles } from '@fuels/presentation/components/PricesProgressBar/styles';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';
import numbro from 'numbro';

const PricesProgressBar: React.FC = () => {
  const progress = useExecutionProgress('prices');
  return (
    <ProgressBar
      style={styles.container}
      title={p =>
        `Processing prices: ${numbro(p * 100).formatCurrency({
          mantissa: 2,
          trimMantissa: false,
        })}%`
      }
      progress={progress}
    />
  );
};

export default PricesProgressBar;
