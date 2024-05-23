import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { createSelector } from '@reduxjs/toolkit';

const area: AppSelector<{
  visible: boolean;
  radius: number;
}> = ({ gasStationsReducer }) => gasStationsReducer.area;

const visible = createSelector(area, state => state.visible);

export const useIsGasStationsAreaVisible = () => useAppSelector(visible);

const radius = createSelector(area, state => state.radius);

export const useGasStationsAreaRadius = () => useAppSelector(radius);
