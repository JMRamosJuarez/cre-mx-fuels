import {
  ErrorState,
  LoadingState,
  WaitingState,
} from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';

export type ExecutionProcessState = { [key: string]: number };

export type DatasourceState =
  | WaitingState
  | LoadingState
  | ErrorState
  | { readonly type: DatasourceStatus };

export interface GasStationsState {
  datasource: DatasourceState;
  executionProcess: ExecutionProcessState;
}

export const initialState: GasStationsState = {
  datasource: { type: 'waiting' },
  executionProcess: {},
};
