import React from 'react';

import DatasourceError from '@fuels/presentation/pages/Error';
import GasStationsMap from '@fuels/presentation/pages/GasStationsMap';
import ProcessingData from '@fuels/presentation/pages/ProcessingData';
import { useDatasourceStatus } from '@fuels/presentation/redux/selectors/datasource';

const MainScreen: React.FC = () => {
  const state = useDatasourceStatus();
  switch (state) {
    case 'error':
      return <DatasourceError />;
    case 'not-available':
      return <ProcessingData />;
    case 'available':
      return <GasStationsMap />;
    default:
      return <></>;
  }
};

export default MainScreen;
