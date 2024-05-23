import React from 'react';

import GasStation from '@fuels/domain/entities/gas_station';
import RouteDataComponent from '@fuels/presentation/components/GasStationRouteData/data';
import RouteDataError from '@fuels/presentation/components/GasStationRouteData/error';
import RouteDataSkeleton from '@fuels/presentation/components/GasStationRouteData/skeleton';
import { useGasStationRouteDataState } from '@fuels/presentation/redux/selectors/routes_data';

const GasStationRouteData: React.FC<{
  readonly station: GasStation;
}> = ({ station }) => {
  const state = useGasStationRouteDataState(station);
  switch (state) {
    case 'waiting':
    case 'loading':
      return <RouteDataSkeleton />;
    case 'success':
      return <RouteDataComponent station={station} />;
    default:
      return <RouteDataError />;
  }
};

export default GasStationRouteData;
