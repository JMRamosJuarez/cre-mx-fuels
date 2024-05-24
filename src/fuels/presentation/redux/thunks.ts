import Location from '@core/domain/entities/location';
import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import GasStationsMapRegion from '@fuels/domain/entities/gas_stations_map_region';
import {
  updateDatasourceStatus,
  updateDownloadProcess,
} from '@fuels/presentation/redux';

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

export const downloadDataAsyncThunk = createAppAsyncThunk<void, void>(
  '/download_data',
  async (
    _,
    {
      dispatch,
      extra: {
        coreComponent: {
          gasStationsComponent: { downloadDataUseCase },
        },
      },
    },
  ) => {
    const data = await downloadDataUseCase.execute();
    const subscription = data.subscribe({
      next: process => {
        dispatch(updateDownloadProcess(process));
      },
      error: () => {
        subscription.unsubscribe();
      },
      complete: () => {
        dispatch(updateDatasourceStatus('available'));
        subscription.unsubscribe();
      },
    });
  },
);

export const getLocationAsyncThunk = createAppAsyncThunk<undefined, Location>(
  '/get-location',
  async (_, { extra: { geolocator } }) => {
    return await geolocator.getLocation();
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
        geolocator,
        coreComponent: {
          gasStationsComponent: { getGasStationsUseCase },
        },
      },
    },
  ) => {
    const distance = request || getState().gasStationsReducer.area.radius;
    const origin = await geolocator.getLocation();
    const stations = await getGasStationsUseCase.execute({
      distance,
      origin,
    });
    return { distance, origin, stations };
  },
);
