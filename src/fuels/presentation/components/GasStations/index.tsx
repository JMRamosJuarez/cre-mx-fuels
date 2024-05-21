import React, { forwardRef } from 'react';

import GasStationsList from '@fuels/presentation/components/GasStations/List';
import GasStationsProps from '@fuels/presentation/components/GasStations/props';
import { useMapRegionState } from '@fuels/presentation/redux/selectors/region';
import { FlatList } from 'react-native';

const GasStations = forwardRef<FlatList, GasStationsProps>((props, ref) => {
  const state = useMapRegionState();
  switch (state) {
    case 'success':
      return <GasStationsList ref={ref} {...props} />;
    default:
      return <></>;
  }
});

export default GasStations;
