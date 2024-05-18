import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { BaseState } from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStationData from '@fuels/domain/entities/gas_station_data';
import GasStationRouteData from '@fuels/domain/entities/gas_station_route_data';
import { initialState } from '@fuels/presentation/redux/state';
import {
  getMapRegionAsyncThunk,
  validateDatasourceAsyncThunk,
} from '@fuels/presentation/redux/thunks';
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
    updateGasStationData: (
      state,
      { payload }: PayloadAction<BaseState<GasStationData>>,
    ) => {
      state.station = payload;
    },
    updateRouteData: (
      state,
      { payload }: PayloadAction<GasStationRouteData>,
    ) => {
      state.routeData = payload;
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

    builder
      .addCase(getMapRegionAsyncThunk.pending, state => {
        state.region = { type: 'loading' };
      })
      .addCase(getMapRegionAsyncThunk.rejected, (state, { payload }) => {
        state.region = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(getMapRegionAsyncThunk.fulfilled, (state, { payload }) => {
        state.region = { type: 'success', data: payload };
      });
  },
});

export const {
  updateDatasourceStatus,
  updateDownloadProcess,
  updateGasStationData,
  updateRouteData,
} = slice.actions;

export const gasStationsReducer = slice.reducer;
