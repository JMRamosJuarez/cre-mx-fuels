import React, { forwardRef } from 'react';

import GasStationsEmpty from '@fuels/presentation/components/GasStations/Empty';
import GasStationsError from '@fuels/presentation/components/GasStations/Error';
import GasStationsList from '@fuels/presentation/components/GasStations/List';
import GasStationsProps from '@fuels/presentation/components/GasStations/props';
import GasStationsSkeleton from '@fuels/presentation/components/GasStations/Skeleton';
import { useGasStationsMapRegionState } from '@fuels/presentation/redux/selectors/gas_stations_map_region';
import { FlatList } from 'react-native';

const GasStations = forwardRef<FlatList, GasStationsProps>((props, ref) => {
  const state = useGasStationsMapRegionState();
  switch (state) {
    case 'waiting':
    case 'loading':
      return <GasStationsSkeleton />;
    case 'empty':
      return <GasStationsEmpty />;
    case 'success':
      return <GasStationsList ref={ref} {...props} />;
    default:
      return <GasStationsError {...props} />;
  }
});

export default GasStations;
