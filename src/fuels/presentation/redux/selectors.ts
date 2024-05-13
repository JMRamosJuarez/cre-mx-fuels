import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { DownloadProcessState } from '@fuels/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const keySelector: AppSelector<string, { readonly key: string }> = (
  _,
  { key },
) => key;

const downloadProcess: AppSelector<DownloadProcessState> = ({
  gasStationsReducer,
}) => gasStationsReducer.downloadProcess;

const progressSelector = createSelector(
  keySelector,
  downloadProcess,
  (key, data) => {
    return data[key] || 0;
  },
);

export const useDownloadProgress = (key: string) =>
  useAppSelector(appState => progressSelector(appState, { key }));
