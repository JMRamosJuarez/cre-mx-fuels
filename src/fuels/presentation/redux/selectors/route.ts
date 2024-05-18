import { AppSelector, useAppSelector } from '@core/presentation/redux';
import GasStationRouteData from '@fuels/domain/entities/gas_station_route_data';

const routeData: AppSelector<GasStationRouteData> = ({ gasStationsReducer }) =>
  gasStationsReducer.routeData;

export const useRouteData = () => useAppSelector(routeData);
