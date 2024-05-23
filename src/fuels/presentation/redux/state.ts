import Location from '@core/domain/entities/location';
import {
  BaseState,
  ErrorState,
  LoadingState,
  WaitingState,
} from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationMapRoute from '@fuels/domain/entities/gas_station_map_route';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';
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
  location: BaseState<Location>;
  gasStationsMapRegion: BaseState<GasStationsMapRegion>;
  routesData: GasStationRoutesState;
  station?: GasStation;
  gasStationMapRoute?: GasStationMapRoute;
  area: {
    radius: number;
    visible: boolean;
  };
}

export const initialState: GasStationsState = {
  datasource: { type: 'waiting' },
  executionProcess: {},
  location: { type: 'waiting' },
  gasStationsMapRegion: { type: 'waiting' },
  routesData: {},
  area: {
    radius: 2500,
    visible: true,
  },
};
