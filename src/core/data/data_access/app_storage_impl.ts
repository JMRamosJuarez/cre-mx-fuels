import AppStorage from '@core/domain/data_access/app_storage';
import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import EncryptedStorage from 'react-native-encrypted-storage';

export default class AppStorageImpl implements AppStorage {
  async getObject<T>(key: string): Promise<T> {
    const json = await EncryptedStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    throw new AppError(AppErrorType.ITEM_NOT_FOUND, key);
  }

  async tryGetObject<T>(key: string): Promise<T | undefined> {
    const json = await EncryptedStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
  }

  async saveObject<T>(key: string, object: T): Promise<T> {
    await EncryptedStorage.setItem(key, JSON.stringify(object));
    return object;
  }

  async removeObject(key: string): Promise<void> {
    await EncryptedStorage.removeItem(key);
  }
}
