import AppGeoLocator from '@core/domain/data_access/app_geolocator';
import { LocationPermissions } from '@core/domain/data_access/permissions';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import Location from '@core/domain/entities/location';
import Geolocation from 'react-native-geolocation-service';
import {
  check as checkPermissions,
  request as requestPermissions,
} from 'react-native-permissions';

export default class AppGeoLocatorImpl implements AppGeoLocator {
  private _getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          reject(
            new AppError(AppErrorType.LOCATION_NOT_AVAILABLE, error.message),
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }

  async getLocation(): Promise<Location> {
    const status = await checkPermissions(LocationPermissions);
    switch (status) {
      case 'limited':
      case 'granted': {
        return await this._getLocation();
      }
      case 'denied': {
        const response = await requestPermissions(LocationPermissions);
        if (response === 'limited' || response === 'granted') {
          return await this._getLocation();
        }
        throw new AppError(AppErrorType.LOCATION_PERMISSIONS_DENIED);
      }
      default:
        throw new AppError(AppErrorType.LOCATION_PERMISSIONS_DENIED);
    }
  }
}
