import React, { forwardRef, useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import GasStationItem from '@fuels/presentation/components/GasStationItem';
import { styles } from '@fuels/presentation/components/GasStations/List/styles';
import GasStationsProps from '@fuels/presentation/components/GasStations/props';
import { useGasStationsMapRegion } from '@fuels/presentation/redux/selectors/gas_stations_map_region';
import { FlatList } from 'react-native';

const GasStationsList = forwardRef<FlatList, GasStationsProps>(
  ({ onGasStationSelected, displayRoute }, ref) => {
    const {
      screen: { width },
    } = useDimensions();

    const ITEM_WIDTH = useMemo(() => width - 32 - 16, [width]);

    const { origin, stations } = useGasStationsMapRegion();

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
        renderItem={({ index, item }) => {
          return (
            <GasStationItem
              width={ITEM_WIDTH}
              station={item}
              displayRoute={station => {
                displayRoute({ index, origin, station });
              }}
            />
          );
        }}
        onMomentumScrollEnd={async ({ nativeEvent: { contentOffset } }) => {
          const index = Math.floor(contentOffset.x / ITEM_WIDTH);
          const station = stations[index];
          onGasStationSelected({ index, origin, station });
        }}
      />
    );
  },
);

export default GasStationsList;
