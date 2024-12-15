import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import AppError from '@core/domain/entities/app_error';
import { AppReduxStore } from '@core/presentation/redux/store';
import {
  Selector,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

export interface AppExtra {
  readonly coreModule: CoreModule;
  readonly coreComponent: CoreComponent;
}

type AppState = ReturnType<typeof AppReduxStore.getState>;

type AppDispatch = typeof AppReduxStore.dispatch;

export type AppAsyncThunkConfig = {
  dispatch: AppDispatch;
  state: AppState;
  extra: AppExtra;
  rejectValue: AppError;
};

export type AppSelector<Response, Request = null> = Selector<
  AppState,
  Response,
  Request
>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
