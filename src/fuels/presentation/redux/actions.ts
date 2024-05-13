import { useCallback } from 'react';

import { useAppDispatch } from '@core/presentation/redux';
import { downloadDataAsyncThunk } from '@fuels/presentation/redux/thunks';

export const useDownloadDataAction = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(downloadDataAsyncThunk());
  }, [dispatch]);
};
