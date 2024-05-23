import { AppSelector, useAppSelector } from '@core/presentation/redux';
import GasStationMapRoute from '@fuels/domain/entities/gas_station_map_route';

const mapRoute: AppSelector<GasStationMapRoute | undefined> = ({
  gasStationsReducer,
}) => gasStationsReducer.gasStationMapRoute;

export const useGasStationMapRoute = () => useAppSelector(mapRoute);
