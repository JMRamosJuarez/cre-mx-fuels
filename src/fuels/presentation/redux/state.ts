export type DownloadProcessState = { [key: string]: number };

export interface GasStationsState {
  downloadProcess: DownloadProcessState;
}

export const initialState: GasStationsState = {
  downloadProcess: {},
};
