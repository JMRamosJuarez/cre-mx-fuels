import { AppSelector, useAppSelector } from '@core/presentation/redux';
import { ExecutionProcessType } from '@fuels/domain/entities/execution_process';
import { ExecutionProcessState } from '@fuels/presentation/redux/state';
import { createSelector } from '@reduxjs/toolkit';

const keySelector: AppSelector<
  ExecutionProcessType,
  { readonly key: ExecutionProcessType }
> = (_, { key }) => key;

const executionProcess: AppSelector<ExecutionProcessState> = ({
  gasStationsReducer,
}) => gasStationsReducer.executionProcess;

const processSelector = createSelector(
  keySelector,
  executionProcess,
  (key, data) => {
    return data[key] || 0;
  },
);

export const useExecutionProgress = (key: ExecutionProcessType) =>
  useAppSelector(appState => processSelector(appState, { key }));
