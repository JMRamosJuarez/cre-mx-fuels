import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { DatasourceState } from '@fuels/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const datasource: AppSelector<DatasourceState> = ({ gasStationsReducer }) =>
  gasStationsReducer.datasource;

const error = createSelector(datasource, state => {
  if (state.type === 'error') {
    return state.error;
  }
  return new AppError(AppErrorType.UNKNOWN_ERROR);
});

export const useDatasourceError = () => useAppSelector(error);

const selector = createSelector(datasource, state => {
  return state.type;
});

export const useDatasourceStatus = () => useAppSelector(selector);
