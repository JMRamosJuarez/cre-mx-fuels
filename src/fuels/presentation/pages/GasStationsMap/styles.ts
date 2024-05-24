import { ITEM_MARGIN, MAP_PADDING_BOTTOM } from '@fuels/domain/entities';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  stations: {
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
  },
  areaToggle: {
    position: 'absolute',
    end: 24 + 48,
    bottom: MAP_PADDING_BOTTOM + ITEM_MARGIN,
  },
  locationButton: {
    position: 'absolute',
    end: 24,
    bottom: MAP_PADDING_BOTTOM + ITEM_MARGIN,
  },
  stationsContent: {
    paddingHorizontal: 16,
    paddingBottom: 38,
  },
  regionSelector: {
    position: 'absolute',
    start: 0,
    end: 0,
  },
});
