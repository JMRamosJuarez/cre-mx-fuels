import React from 'react';

import Area from '@fuels/presentation/components/GasStationsArea/Area';
import { useLocationState } from '@fuels/presentation/redux/selectors/location';

const GasStationsArea: React.FC = () => {
  const state = useLocationState();
  switch (state) {
    case 'success':
      return <Area />;
    default:
      return <></>;
  }
};

export default GasStationsArea;
