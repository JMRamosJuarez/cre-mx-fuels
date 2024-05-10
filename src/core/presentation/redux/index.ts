import CoreComponent from '@core/domain/di/components/core_component';
import AppError from '@core/domain/entities/app_error';
import { AppReduxStore } from '@core/presentation/redux/store';
import { BaseThunkAPI } from 'node_modules/@reduxjs/toolkit/dist/createAsyncThunk';
import {
  Selector,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

export interface AppExtra {
  readonly coreComponent: CoreComponent;
}

export type AppState = ReturnType<typeof AppReduxStore.getState>;

export type AppDispatch = typeof AppReduxStore.dispatch;

export type AppAsyncThunkConfig = {
  dispatch: AppDispatch;
  state: AppState;
  extra: AppExtra;
  rejectValue: AppError;
};

export type AppThunkApi = BaseThunkAPI<
  AppState,
  AppExtra,
  AppDispatch,
  AppError
>;

export type AppSelector<Response, Request = null> = Selector<
  AppState,
  Response,
  Request
>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
