import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import GasStationData from '@fuels/domain/entities/gas_station_data';
import { createSelector } from '@reduxjs/toolkit';

const data: AppSelector<BaseState<GasStationData>> = ({ gasStationsReducer }) =>
  gasStationsReducer.station;

const stateSelector = createSelector(data, state => {
  return state.type;
});

const dataSelector = createSelector(data, state => {
  if (state.type === 'success') {
    return state.data;
  }
  throw new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useGasStationDataState = () => useAppSelector(stateSelector);

export const useGasStationData = () => useAppSelector(dataSelector);
