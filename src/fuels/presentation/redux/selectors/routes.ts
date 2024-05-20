import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { AppSelector, useAppSelector } from '@core/presentation/redux';
import GasStation from '@fuels/domain/entities/gas_station';
import { GasStationRoutesState } from '@fuels/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

const keySelector: AppSelector<string, { readonly station: GasStation }> = (
  _,
  { station },
) => `${station.id}-${station.creId}`;

const routes: AppSelector<GasStationRoutesState> = ({ gasStationsReducer }) =>
  gasStationsReducer.routes;

const route = createSelector(keySelector, routes, (key, items) => {
  return items[key] || { type: 'waiting' };
});

const stateSelector = createSelector(route, state => {
  return state.type;
});

const dataSelector = createSelector(route, state => {
  if (state.type === 'success') {
    return state.data;
  }
  throw new AppError(AppErrorType.INVALID_STATE_ACCESS);
});

export const useGasStationRouteDataState = (station: GasStation) =>
  useAppSelector(appState => stateSelector(appState, { station }));

export const useGasStationRouteData = (station: GasStation) =>
  useAppSelector(appState => dataSelector(appState, { station }), shallowEqual);
