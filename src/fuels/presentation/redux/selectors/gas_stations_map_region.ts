import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';
import { createSelector } from '@reduxjs/toolkit';

const region: AppSelector<BaseState<GasStationsMapRegion>> = ({
  gasStationsReducer,
}) => gasStationsReducer.gasStationsMapRegion;

const stateSelector = createSelector(region, state => {
  return state.type;
});

export const useGasStationsMapRegionState = () => useAppSelector(stateSelector);

const data = createSelector(region, state => {
  if (state.type === 'success') {
    return state.data;
  }
  throw new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useGasStationsMapRegion = () => useAppSelector(data);

const error = createSelector(region, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useGasStationsMapRegionError = () => useAppSelector(error);
