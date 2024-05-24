export default interface AppStorage {
  getObject<T>(key: string): Promise<T>;
  tryGetObject<T>(key: string): Promise<T | undefined>;
  saveObject<T>(key: string, object: T): Promise<T>;
  removeObject(key: string): Promise<void>;
}
