import React from 'react';

import Markers from '@fuels/presentation/components/GasStationsMarkers/Markers';
import GasStationsMarkersProps from '@fuels/presentation/components/GasStationsMarkers/props';
import { useGasStationsMapRegionState } from '@fuels/presentation/redux/selectors/gas_stations_map_region';

const GasStationsMarkers: React.FC<GasStationsMarkersProps> = props => {
  const state = useGasStationsMapRegionState();

  switch (state) {
    case 'success':
      return <Markers {...props} />;
    default:
      return <></>;
  }
};

export default GasStationsMarkers;
