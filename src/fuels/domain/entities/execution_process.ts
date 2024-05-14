type ExecutionProcess = {
  readonly type: 'stations' | 'prices';
  readonly progress: number;
};

export default ExecutionProcess;
