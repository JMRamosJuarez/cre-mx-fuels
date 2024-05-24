import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { BaseState } from '@core/presentation/redux/state';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStation from '@fuels/domain/entities/gas_station';
import GasStationMapRoute from '@fuels/domain/entities/gas_station_map_route';
import RouteData from '@fuels/domain/entities/route_data';
import { initialState } from '@fuels/presentation/redux/state';
import {
  getGasStationsMapRegionAsyncThunk,
  getLocationAsyncThunk,
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
    updateGasStationRoute: (
      state,
      { payload }: PayloadAction<GasStationMapRoute>,
    ) => {
      state.gasStationMapRoute = payload;
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
      state.routesData[`${station.id}-${station.creId}`] = data;
    },
    selectGasStation: (state, { payload }: PayloadAction<GasStation>) => {
      state.station = payload;
    },
    displayGasStationsArea: (state, { payload }: PayloadAction<boolean>) => {
      state.area.visible = payload;
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
      .addCase(getLocationAsyncThunk.pending, state => {
        state.location = { type: 'loading' };
      })
      .addCase(getLocationAsyncThunk.rejected, (state, { payload }) => {
        state.location = {
          type: 'error',
          error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
        };
      })
      .addCase(getLocationAsyncThunk.fulfilled, (state, { payload }) => {
        state.location = { type: 'success', data: payload };
      });

    builder
      .addCase(getGasStationsMapRegionAsyncThunk.pending, state => {
        state.gasStationsMapRegion = { type: 'loading' };
      })
      .addCase(
        getGasStationsMapRegionAsyncThunk.rejected,
        (state, { payload }) => {
          state.gasStationsMapRegion = {
            type: 'error',
            error: payload || new AppError(AppErrorType.UNKNOWN_ERROR),
          };
        },
      )
      .addCase(
        getGasStationsMapRegionAsyncThunk.fulfilled,
        (state, { payload }) => {
          state.area = { visible: true, radius: payload.distance };
          state.location = { type: 'success', data: payload.origin };
          if (payload.stations.length > 0) {
            state.gasStationMapRoute = {
              color: 'transparent',
              origin: payload.origin,
              station: payload.stations[0],
            };
            state.gasStationsMapRegion = { type: 'success', data: payload };
          } else {
            state.gasStationsMapRegion = { type: 'empty' };
          }
        },
      );
  },
});

export const {
  updateDatasourceStatus,
  updateDownloadProcess,
  updateGasStationRoute,
  updateGasStationRouteData,
  selectGasStation,
  displayGasStationsArea,
} = slice.actions;

export const gasStationsReducer = slice.reducer;
