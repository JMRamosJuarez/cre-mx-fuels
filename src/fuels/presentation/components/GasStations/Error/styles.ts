import { GAS_STATION_ITEM_HEIGHT } from '@fuels/domain/entities';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    start: 16,
    end: 16,
    bottom: 16,
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
  button: {
    marginHorizontal: 32,
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 48,
  },
  buttonLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    marginHorizontal: 8,
  },
});
