import React from 'react';

import { AppNavigationStack } from '@core/presentation/navigation/AppNavigator/config';
import { useValidateDatasourceAction } from '@fuels/presentation/redux/actions';
import MainScreen from '@fuels/presentation/screens/Main';
import { NavigationContainer } from '@react-navigation/native';
import { hide } from 'react-native-bootsplash';

const AppNavigator: React.FC = () => {
  const validateDatasource = useValidateDatasourceAction();
  return (
    <NavigationContainer
      onReady={async () => {
        await validateDatasource();
        hide({ fade: true });
      }}>
      <AppNavigationStack.Navigator
        initialRouteName={'Main'}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}>
        <AppNavigationStack.Screen name={'Main'} component={MainScreen} />
      </AppNavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
