import React, { forwardRef, useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import GasStationItem from '@fuels/presentation/components/GasStationItem';
import { styles } from '@fuels/presentation/components/GasStations/List/styles';
import GasStationsProps from '@fuels/presentation/components/GasStations/props';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { FlatList } from 'react-native';

const GasStationsList = forwardRef<FlatList, GasStationsProps>(
  ({ selectStation, displayRoute }, ref) => {
    const {
      screen: { width },
    } = useDimensions();

    const ITEM_WIDTH = useMemo(() => width - 32 - 16, [width]);

    const region = useMapRegion();

    const stations = useMemo(() => {
      return region?.stations || [];
    }, [region?.stations]);

    return (
      <FlatList
        ref={ref}
        horizontal
        pagingEnabled
        snapToInterval={width - 32}
        data={stations}
        keyExtractor={station => `${station.id}-${station.creId}`}
        style={styles.stations}
        contentContainerStyle={styles.stationsContent}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + 16,
          offset: (ITEM_WIDTH + 16) * index,
          index,
        })}
        renderItem={({ item }) => {
          return (
            <GasStationItem
              width={ITEM_WIDTH}
              station={item}
              displayRoute={station => {
                displayRoute(station);
              }}
            />
          );
        }}
        onMomentumScrollEnd={async ({ nativeEvent: { contentOffset } }) => {
          const index = Math.floor(contentOffset.x / ITEM_WIDTH);
          const station = stations[index];
          selectStation(station);
        }}
      />
    );
  },
);

export default GasStationsList;
