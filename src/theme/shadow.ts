import { Platform, ViewStyle } from 'react-native';

export const boxShadow: ViewStyle = {
  borderWidth: 1,
  borderColor: '#F8F9FD',
  shadowColor: Platform.select({
    android: '#595959',
    ios: '#C2C2C2',
  }),
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 1,
  shadowRadius: 8,
  elevation: 4,
};
