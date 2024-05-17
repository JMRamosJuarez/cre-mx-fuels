import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import DatasourceStatus from '@fuels/domain/entities/datasource_status';
import MapRegion from '@fuels/domain/entities/map_region';
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

export const getMapRegionAsyncThunk = createAppAsyncThunk<number, MapRegion>(
  '/get-map-region',
  async (
    distance,
    {
      extra: {
        geolocator,
        coreComponent: {
          gasStationsComponent: { getGasStationsUseCase },
        },
      },
    },
  ) => {
    const location = await geolocator.getLocation();
    const stations = await getGasStationsUseCase.execute({
      distance,
      location,
    });
    return { location, stations };
  },
);
