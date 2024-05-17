import { useNavigation } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

export type AppStackParams = {
  Main: undefined;
};

export const AppNavigationStack = createStackNavigator<AppStackParams>();

export type AppNavigationProp = StackNavigationProp<AppStackParams>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();
