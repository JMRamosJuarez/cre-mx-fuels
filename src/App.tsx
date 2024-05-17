import React from 'react';

import AppNavigator from '@core/presentation/navigation/AppNavigator';
import AppReduxProvider from '@core/presentation/redux/provider';
import { AppThemeProvider } from '@theme/index';

const App: React.FC = () => {
  return (
    <AppReduxProvider>
      <AppThemeProvider>
        <AppNavigator />
      </AppThemeProvider>
    </AppReduxProvider>
  );
};

export default App;
