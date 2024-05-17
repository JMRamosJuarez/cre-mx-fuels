export type ExecutionProcessType = 'stations' | 'prices';

type ExecutionProcess = {
  readonly type: ExecutionProcessType;
  readonly progress: number;
};

export default ExecutionProcess;
