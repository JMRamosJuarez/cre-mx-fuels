import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { styles } from '@fuels/presentation/components/GasStationsProgressBar/styles';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';
import numbro from 'numbro';

const GasStationsProgressBar: React.FC = () => {
  const progress = useExecutionProgress('stations');
  return (
    <ProgressBar
      style={styles.container}
      title={p =>
        `Processing gas stations: ${numbro(p * 100).format({
          mantissa: 2,
          trimMantissa: false,
        })}%`
      }
      progress={progress}
    />
  );
};

export default GasStationsProgressBar;
