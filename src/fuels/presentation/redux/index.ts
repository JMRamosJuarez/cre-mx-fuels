import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import { initialState } from '@fuels/presentation/redux/state';
import { validateDatasourceAsyncThunk } from '@fuels/presentation/redux/thunks';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '/gas_stations',
  initialState,
  reducers: {
    updateDatasourceStatus: (
      state,
      { payload }: PayloadAction<DatasourceStatus>,
    ) => {
      state.datasource = { type: payload };
    },
    updateDownloadProcess: (
      state,
      { payload }: PayloadAction<ExecutionProcess>,
    ) => {
      state.executionProcess[payload.type] = payload.progress;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(validateDatasourceAsyncThunk.pending, state => {
        state.datasource = { type: 'loading' };
      })
      .addCase(validateDatasourceAsyncThunk.rejected, (state, { payload }) => {
        state.datasource = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(validateDatasourceAsyncThunk.fulfilled, (state, { payload }) => {
        state.datasource = { type: payload };
      });
  },
});

export const { updateDatasourceStatus, updateDownloadProcess } = slice.actions;

export const gasStationsReducer = slice.reducer;
