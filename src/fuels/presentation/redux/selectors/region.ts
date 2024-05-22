import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';
import { createSelector } from '@reduxjs/toolkit';

const region: AppSelector<BaseState<GasStationsMapRegion>> = ({
  gasStationsReducer,
}) => gasStationsReducer.region;

const stateSelector = createSelector(region, state => {
  return state.type;
});

const dataSelector = createSelector(region, state => {
  if (state.type === 'success') {
    return state.data;
  }
});

export const useMapRegionState = () => useAppSelector(stateSelector);

export const useMapRegion = () => useAppSelector(dataSelector);
