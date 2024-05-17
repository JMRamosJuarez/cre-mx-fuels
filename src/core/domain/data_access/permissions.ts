import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

export const LocationPermissions =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
