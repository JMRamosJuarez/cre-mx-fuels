import AppError from '@core/domain/entities/app_error';

export interface WaitingState {
  readonly type: 'waiting';
}

export interface LoadingState {
  readonly type: 'loading';
  readonly message?: string;
}

export interface EmptyState {
  readonly type: 'empty';
}

export interface ErrorState {
  readonly type: 'error';
  readonly error: AppError;
}

export interface SuccessState<T> {
  readonly type: 'success';
  readonly data: T;
  readonly refreshing?: boolean;
}

export type BaseState<T> =
  | WaitingState
  | LoadingState
  | ErrorState
  | EmptyState
  | SuccessState<T>;
