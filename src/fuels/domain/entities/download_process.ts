type DownloadProcess = {
  readonly type: 'stations' | 'prices';
  readonly progress: number;
};

export default DownloadProcess;
