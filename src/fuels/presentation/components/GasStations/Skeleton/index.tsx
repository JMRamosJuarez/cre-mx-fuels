import React, { useMemo } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import GasStationItemSkeleton from '@fuels/presentation/components/GasStationItemSkeleton';
import { styles } from '@fuels/presentation/components/GasStations/Skeleton/styles';
import { FlatList } from 'react-native';

const GasStationsSkeleton: React.FC = () => {
  const {
    screen: { width },
  } = useDimensions();

  const ITEM_WIDTH = useMemo(() => width - 32 - 16, [width]);

  const stations = useMemo(() => new Array(2).fill({}), []);

  return (
    <FlatList
      horizontal
      pagingEnabled
      scrollEnabled={false}
      snapToInterval={width - 32}
      data={stations}
      keyExtractor={(_, index) => `${index}`}
      style={styles.stations}
      contentContainerStyle={styles.stationsContent}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH + 16,
        offset: (ITEM_WIDTH + 16) * index,
        index,
      })}
      renderItem={() => {
        return <GasStationItemSkeleton width={ITEM_WIDTH} />;
      }}
    />
  );
};

export default GasStationsSkeleton;
