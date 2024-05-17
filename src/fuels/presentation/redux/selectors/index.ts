import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { DatasourceState } from '@fuels/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const datasource: AppSelector<DatasourceState> = ({ gasStationsReducer }) =>
  gasStationsReducer.datasource;

const selector = createSelector(datasource, state => {
  return state.type;
});

export const useDatasourceStatus = () => useAppSelector(selector);
