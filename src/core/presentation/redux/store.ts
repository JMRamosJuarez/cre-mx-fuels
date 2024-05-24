import CoreComponentImpl from '@core/data/di/components/core_component_impl';
import CoreModuleImpl from '@core/data/di/modules/core_module_impl';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import { gasStationsReducer } from '@fuels/presentation/redux';
import { configureStore } from '@reduxjs/toolkit';

const coreModule: CoreModule = new CoreModuleImpl();

const coreComponent: CoreComponent = new CoreComponentImpl(coreModule);

export const AppReduxStore = configureStore({
  reducer: { gasStationsReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { coreModule, coreComponent },
      },
      serializableCheck: false,
    }),
});
