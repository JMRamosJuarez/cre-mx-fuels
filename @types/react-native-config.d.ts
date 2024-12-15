declare module 'react-native-config' {
  export interface NativeConfig {
    CRE_URL: string;
    CRE_DATA_BASE_URL: string;
    GOOGLE_MAPS_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
