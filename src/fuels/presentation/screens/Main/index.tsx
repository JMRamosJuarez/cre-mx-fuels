import React from 'react';

import DownloadProcess from '@fuels/presentation/pages/DownloadProcess';
import GasStationsMap from '@fuels/presentation/pages/GasStationsMap';
import { useDatasourceStatus } from '@fuels/presentation/redux/selectors/datasource';

const MainScreen: React.FC = () => {
  const state = useDatasourceStatus();
  switch (state) {
    case 'not-available':
      return <DownloadProcess />;
    case 'available':
      return <GasStationsMap />;
    default:
      return <></>;
  }
};

export default MainScreen;
