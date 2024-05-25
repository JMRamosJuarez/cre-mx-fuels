import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { styles } from '@fuels/presentation/components/GasStationsProgressBar/styles';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';

const GasStationsProgressBar: React.FC = () => {
  const { t } = useTranslation();
  const progress = useExecutionProgress('stations');
  return (
    <ProgressBar
      style={styles.container}
      title={p =>
        t('processing_gas_stations', {
          value: numbro(p * 100).format({
            mantissa: 2,
            trimMantissa: false,
          }),
        })
      }
      progress={progress}
    />
  );
};

export default GasStationsProgressBar;
