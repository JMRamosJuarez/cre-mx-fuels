import React from 'react';

import ProgressBar from '@core/presentation/components/ProgressBar';
import { styles } from '@fuels/presentation/components/PricesProgressBar/styles';
import { useExecutionProgress } from '@fuels/presentation/redux/selectors/execution_process';
import numbro from 'numbro';
import { useTranslation } from 'react-i18next';

const PricesProgressBar: React.FC = () => {
  const { t } = useTranslation();
  const progress = useExecutionProgress('prices');
  return (
    <ProgressBar
      style={styles.container}
      title={p =>
        t('processing_prices', {
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

export default PricesProgressBar;
