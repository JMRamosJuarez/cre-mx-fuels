import React, { PropsWithChildren, createContext, useContext } from 'react';

import AppColors, { colors } from '@theme/colors';
import { boxShadow } from '@theme/shadow';
import { StatusBar, ViewStyle } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export interface AppTheme {
  readonly boxShadow: ViewStyle;
  readonly colors: AppColors;
}

const theme: AppTheme = {
  boxShadow,
  colors,
};

const AppThemeContext = createContext<AppTheme>(theme);

export const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <AppThemeContext.Provider value={theme}>
    <StatusBar
      translucent
      barStyle={'dark-content'}
      backgroundColor={'transparent'}
    />
    <SafeAreaProvider>{children}</SafeAreaProvider>
  </AppThemeContext.Provider>
);

export const useAppTheme = () => useContext(AppThemeContext);
