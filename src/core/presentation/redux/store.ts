import AppGeoLocatorImpl from '@core/data/data_access/app_geolocator_impl';
import CoreComponentImpl from '@core/data/di/components/core_component_impl';
import CoreModuleImpl from '@core/data/di/modules/core_module_impl';
import AppGeoLocator from '@core/domain/data_access/app_geolocator';
import CoreComponent from '@core/domain/di/components/core_component';
import CoreModule from '@core/domain/di/modules/core_module';
import { gasStationsReducer } from '@fuels/presentation/redux';
import { configureStore } from '@reduxjs/toolkit';

const geolocator: AppGeoLocator = new AppGeoLocatorImpl();

const coreModule: CoreModule = new CoreModuleImpl(geolocator);

const coreComponent: CoreComponent = new CoreComponentImpl(coreModule);

export const AppReduxStore = configureStore({
  reducer: { gasStationsReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { coreComponent, geolocator },
      },
      serializableCheck: false,
    }),
});
