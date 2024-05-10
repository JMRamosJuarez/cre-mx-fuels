import React, { PropsWithChildren } from 'react';

import { AppReduxStore } from '@core/presentation/redux/store';
import { Provider } from 'react-redux';

const AppReduxProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={AppReduxStore}>{children}</Provider>;
};

export default AppReduxProvider;
