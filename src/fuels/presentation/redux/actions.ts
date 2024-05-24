import { useCallback } from 'react';

import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { useAppDispatch } from '@core/presentation/redux';
import { BaseState } from '@core/presentation/redux/state';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationMapRoute from '@fuels/domain/entities/gas_station_map_route';
import RouteData from '@fuels/domain/entities/route_data';
import {
  displayGasStationsArea,
  selectGasStation,
  updateDatasourceStatus,
  updateExecutionProcess,
  updateGasStationRoute,
  updateGasStationRouteData,
} from '@fuels/presentation/redux';
import { DatasourceState } from '@fuels/presentation/redux/state';
import {
  getExecutionProcessAsyncThunk,
  getGasStationsMapRegionAsyncThunk,
  validateDatasourceAsyncThunk,
} from '@fuels/presentation/redux/thunks';
import { unwrapResult } from '@reduxjs/toolkit';
import { Subscription } from 'rxjs';

export const useValidateDatasourceAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    const response = await dispatch(validateDatasourceAsyncThunk());
    return unwrapResult(response);
  }, [dispatch]);
};

export const useUpdateDatasourceStatusAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: DatasourceState) => {
      dispatch(updateDatasourceStatus(request));
    },
    [dispatch],
  );
};

export const useUpdateExecutionProcessAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (request: ExecutionProcess) => {
      dispatch(updateExecutionProcess(request));
    },
    [dispatch],
  );
};

export const useGetExecutionProcessAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    const response = await dispatch(getExecutionProcessAsyncThunk());
    return unwrapResult(response);
  }, [dispatch]);
};

export const useDownloadDataAction = () => {
  const getProcess = useGetExecutionProcessAction();

  const updateProcess = useUpdateExecutionProcessAction();

  const updateStatus = useUpdateDatasourceStatusAction();

  return useCallback(() => {
    let subscription: Subscription;

    const init = async () => {
      try {
        const observable = await getProcess();
        subscription = observable.subscribe({
          next: process => {
            updateProcess(process);
          },
          complete: () => {
            updateStatus({ type: 'available' });
          },
        });
      } catch (error) {
        updateStatus({
          type: 'error',
          error: new AppError(
            AppErrorType.UNKNOWN_ERROR,
            JSON.stringify(error),
          ),
        });
      }
    };

    init();

    return () => {
      subscription?.unsubscribe();
    };
  }, [getProcess, updateProcess, updateStatus]);
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
