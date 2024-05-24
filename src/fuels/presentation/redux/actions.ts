import { useCallback } from 'react';

import { useAppDispatch } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationMapRoute from '@fuels/domain/entities/gas_station_map_route';
import RouteData from '@fuels/domain/entities/route_data';
import {
  displayGasStationsArea,
  selectGasStation,
  updateGasStationRoute,
  updateGasStationRouteData,
} from '@fuels/presentation/redux';
import {
  downloadDataAsyncThunk,
  getGasStationsMapRegionAsyncThunk,
  validateDatasourceAsyncThunk,
} from '@fuels/presentation/redux/thunks';
import { unwrapResult } from '@reduxjs/toolkit';

export const useValidateDatasourceAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    const response = await dispatch(validateDatasourceAsyncThunk());
    return unwrapResult(response);
  }, [dispatch]);
};

export const useDownloadDataAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(downloadDataAsyncThunk());
  }, [dispatch]);
};

export const useGetGasStationsMapRegionAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    async (request?: number) => {
      const response = await dispatch(
        getGasStationsMapRegionAsyncThunk(request),
      );
      return unwrapResult(response);
    },
    [dispatch],
  );
};

export const useSelectGasStationAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: GasStation) => {
      dispatch(selectGasStation(request));
    },
    [dispatch],
  );
};

export const useUpdateGasStationRouteAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: GasStationMapRoute) => {
      dispatch(updateGasStationRoute(request));
    },
    [dispatch],
  );
};

export const useUpdateGasStationRouteDataAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: {
      readonly station: GasStation;
      readonly data: BaseState<RouteData>;
    }) => {
      dispatch(updateGasStationRouteData(request));
    },
    [dispatch],
  );
};

export const useDisplayGasStationAreaAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: boolean) => {
      dispatch(displayGasStationsArea(request));
    },
    [dispatch],
  );
};
