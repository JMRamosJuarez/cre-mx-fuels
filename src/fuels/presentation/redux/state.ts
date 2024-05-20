import {
  BaseState,
  ErrorState,
  LoadingState,
  WaitingState,
} from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';
import MapRoute from '@fuels/domain/entities/map_route';
import RouteData from '@fuels/domain/entities/route_data';

export type ExecutionProcessState = { [key: string]: number };

export type GasStationRoutesState = {
  [key: string]: BaseState<RouteData>;
};

export type DatasourceState =
  | WaitingState
  | LoadingState
  | ErrorState
  | { readonly type: DatasourceStatus };

export interface GasStationsState {
  datasource: DatasourceState;
  executionProcess: ExecutionProcessState;
  region: BaseState<GasStationsMapRegion>;
  mapRoute: MapRoute;
  routes: GasStationRoutesState;
}

export const initialState: GasStationsState = {
  datasource: { type: 'waiting' },
  executionProcess: {},
  region: { type: 'waiting' },
  mapRoute: { color: 'transparent' },
  routes: {},
};
