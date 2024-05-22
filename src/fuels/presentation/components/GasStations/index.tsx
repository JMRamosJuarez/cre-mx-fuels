import React, { forwardRef } from 'react';

import GasStationsEmpty from '@fuels/presentation/components/GasStations/Empty';
import GasStationsError from '@fuels/presentation/components/GasStations/Error';
import GasStationsList from '@fuels/presentation/components/GasStations/List';
import GasStationsProps from '@fuels/presentation/components/GasStations/props';
import GasStationsSkeleton from '@fuels/presentation/components/GasStations/Skeleton';
import { useMapRegionState } from '@fuels/presentation/redux/selectors/region';
import { FlatList } from 'react-native';

const GasStations = forwardRef<FlatList, GasStationsProps>((props, ref) => {
  const state = useMapRegionState();
  switch (state) {
    case 'waiting':
    case 'loading':
      return <GasStationsSkeleton />;
    case 'empty':
      return <GasStationsEmpty />;
    case 'success':
      return <GasStationsList ref={ref} {...props} />;
    default:
      return <GasStationsError />;
  }
});

export default GasStations;
