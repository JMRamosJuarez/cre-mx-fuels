import {
  GAS_STATION_ITEM_HEIGHT,
  GOOGLE_MAPS_LOGO_HEIGHT,
} from '@fuels/domain/entities';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    start: 16,
    end: 16,
    bottom: GOOGLE_MAPS_LOGO_HEIGHT,
    height: GAS_STATION_ITEM_HEIGHT,
    borderRadius: 4,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 24,
  },
});
