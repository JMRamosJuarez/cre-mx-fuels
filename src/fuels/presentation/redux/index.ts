import DownloadProcess from '@fuels/domain/entities/download_process';
import { initialState } from '@fuels/presentation/redux/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: '/gas_stations',
  initialState,
  reducers: {
    updateDownloadProcess: (
      state,
      { payload }: PayloadAction<DownloadProcess>,
    ) => {
      state.downloadProcess[payload.type] = payload.progress;
    },
  },
});

export const { updateDownloadProcess } = slice.actions;

export const gasStationsReducer = slice.reducer;
