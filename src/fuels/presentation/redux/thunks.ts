import { createAppAsyncThunk } from '@core/presentation/redux/thunks';
import { updateDownloadProcess } from '@fuels/presentation/redux';

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
        subscription.unsubscribe();
      },
    });
  },
);
