import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import Location from '@core/domain/entities/location';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const baseState: AppSelector<BaseState<Location>> = ({ gasStationsReducer }) =>
  gasStationsReducer.location;

const stateType = createSelector(baseState, state => state.type);

export const useLocationState = () => useAppSelector(stateType);

const location = createSelector(baseState, state => {
  if (state.type === 'success') {
    return state.data;
  }
  throw new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useLocation = () => useAppSelector(location);
