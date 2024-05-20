import { AppSelector, useAppSelector } from '@core/presentation/redux';
import MapRoute from '@fuels/domain/entities/map_route';

const mapRoute: AppSelector<MapRoute> = ({ gasStationsReducer }) =>
  gasStationsReducer.mapRoute;

export const useMapRoute = () => useAppSelector(mapRoute);
