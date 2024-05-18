import React from 'react';

import GasStationRoute from '@fuels/domain/entities/gas_station_route';
import GasStationData from '@fuels/presentation/components/GasStationBottomSheet/data';
import { useGasStationDataState } from '@fuels/presentation/redux/selectors/station';

const GasStationBottomSheet: React.FC<{
  readonly displayRoute: (route: GasStationRoute) => void;
}> = ({ displayRoute }) => {
  const state = useGasStationDataState();
  switch (state) {
    case 'waiting':
    case 'loading':
      return <></>;
    case 'success':
      return <GasStationData displayRoute={displayRoute} />;
    default:
      return <></>;
  }
};

export default GasStationBottomSheet;
