import { useCallback } from 'react';

import { useAppDispatch } from '@core/presentation/redux';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import { updateDatasourceStatus } from '@fuels/presentation/redux';
import {
  downloadDataAsyncThunk,
  getMapRegionAsyncThunk,
  validateDatasourceAsyncThunk,
} from '@fuels/presentation/redux/thunks';
import { unwrapResult } from '@reduxjs/toolkit';

export const useUpdateDatasourceStatusAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (status: DatasourceStatus) => {
      dispatch(updateDatasourceStatus(status));
    },
    [dispatch],
  );
};

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

export const useGetMapRegionAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    async (request: number) => {
      const response = await dispatch(getMapRegionAsyncThunk(request));
      return unwrapResult(response);
    },
    [dispatch],
  );
};
