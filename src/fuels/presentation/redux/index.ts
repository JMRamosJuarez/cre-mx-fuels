import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { BaseState } from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStation from '@fuels/domain/entities/gas_station';
import MapRoute from '@fuels/domain/entities/map_route';
import RouteData from '@fuels/domain/entities/route_data';
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
    updateGasStationRouteData: (
      state,
      {
        payload: { station, data },
      }: PayloadAction<{
        readonly station: GasStation;
        readonly data: BaseState<RouteData>;
      }>,
    ) => {
      state.routes[`${station.id}-${station.creId}`] = data;
    },
    updateMapRoute: (state, { payload }: PayloadAction<MapRoute>) => {
      state.mapRoute = payload;
    },
    selectGasStation: (state, { payload }: PayloadAction<GasStation>) => {
      state.station = payload;
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
        if (payload.stations.length > 0) {
          const station = payload.stations[0];
          state.station = station;
          state.mapRoute = {
            color: 'transparent',
            data: { origin: payload.location, destination: station.location },
          };
        }
      });
  },
});

export const {
  updateDatasourceStatus,
  updateDownloadProcess,
  updateGasStationRouteData,
  updateMapRoute,
  selectGasStation,
} = slice.actions;

export const gasStationsReducer = slice.reducer;
