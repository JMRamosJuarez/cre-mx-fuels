import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { instanceOfAppError } from '@core/domain/errors';
import { AppAsyncThunkConfig } from '@core/presentation/redux';
import {
  AsyncThunkOptions,
  createAsyncThunk,
  GetThunkAPI,
} from '@reduxjs/toolkit';

export const createAppAsyncThunk = <Request, Response>(
  prefix: string,
  thunk: (
    request: Request,
    api: GetThunkAPI<AppAsyncThunkConfig>,
  ) => Promise<Response>,
  options?: AsyncThunkOptions<Request, GetThunkAPI<AppAsyncThunkConfig>>,
) =>
  createAsyncThunk<Response, Request, AppAsyncThunkConfig>(
    prefix,
    async (request, thunkAPI) => {
      try {
        return await thunk(request, thunkAPI);
      } catch (error) {
        if (instanceOfAppError(error)) {
          return thunkAPI.rejectWithValue(error);
        }
        return thunkAPI.rejectWithValue(
          new AppError(
            AppErrorType.UNKNOWN_ERROR,
            JSON.stringify(error, null, '\t'),
          ),
        );
      }
    },
    options,
  );
