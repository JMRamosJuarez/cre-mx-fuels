import {
  BaseState,
  ErrorState,
  LoadingState,
  WaitingState,
} from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasStationData from '@fuels/domain/entities/gas_station_data';
import GasStationRouteData from '@fuels/domain/entities/gas_station_route_data';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';

export type ExecutionProcessState = { [key: string]: number };

export type DatasourceState =
  | WaitingState
  | LoadingState
  | ErrorState
  | { readonly type: DatasourceStatus };

export interface GasStationsState {
  datasource: DatasourceState;
  executionProcess: ExecutionProcessState;
  region: BaseState<GasStationsMapRegion>;
  station: BaseState<GasStationData>;
  routeData: GasStationRouteData;
}

export const initialState: GasStationsState = {
  datasource: { type: 'waiting' },
  executionProcess: {},
  region: { type: 'waiting' },
  station: { type: 'waiting' },
  routeData: { color: 'transparent' },
};
