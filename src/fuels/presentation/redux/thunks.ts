import Location from '@core/domain/entities/location';
import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import ExecutionProcess from '@fuels/domain/entities/execution_process';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';
import { Observable } from 'rxjs';

export const validateDatasourceAsyncThunk = createAppAsyncThunk<
  void,
  DatasourceStatus
>(
  '/validate_datasource',
  async (
    _,
    {
      extra: {
        coreComponent: {
          gasStationsComponent: { validateDatasourceUseCase },
        },
      },
    },
  ) => {
    return await validateDatasourceUseCase.execute();
  },
);

export const getExecutionProcessAsyncThunk = createAppAsyncThunk<
  void,
  Observable<ExecutionProcess>
>(
  '/get-execution-process',
  async (
    _,
    {
      extra: {
        coreComponent: {
          gasStationsComponent: { downloadDataUseCase },
        },
      },
    },
  ) => {
    return await downloadDataUseCase.execute();
  },
);

export const getLocationAsyncThunk = createAppAsyncThunk<undefined, Location>(
  '/get-location',
  async (
    _,
    {
      extra: {
        coreModule: { appGeolocator },
      },
    },
  ) => {
    return await appGeolocator.getLocation();
  },
);

export const getGasStationsMapRegionAsyncThunk = createAppAsyncThunk<
  number | undefined,
  GasStationsMapRegion
>(
  '/get-gas-stations-map-region',
  async (
    request,
    {
      getState,
      extra: {
        coreModule: { appGeolocator },
        coreComponent: {
          gasStationsComponent: { getGasStationsUseCase },
        },
      },
    },
  ) => {
    const distance = request || getState().gasStationsReducer.area.radius;
    const origin = await appGeolocator.getLocation();
    const stations = await getGasStationsUseCase.execute({
      distance,
      origin,
    });
    return { distance, origin, stations };
  },
);
