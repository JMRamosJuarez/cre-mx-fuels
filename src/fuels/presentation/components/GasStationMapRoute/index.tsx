import React from 'react';

import { useUpdateGasStationDataAction } from '@fuels/presentation/redux/actions';
import { useRouteData } from '@fuels/presentation/redux/selectors/route';
import { Config } from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';

const GasStationMapRoute: React.FC = () => {
  const updateGasStationData = useUpdateGasStationDataAction();

  const { color, route } = useRouteData();

  return (
    <>
      {route?.station && (
        <MapViewDirections
          apikey={Config.GOOGLE_MAPS_API_KEY || '-'}
          origin={route.origin}
          destination={route.destination}
          strokeColor={color}
          strokeWidth={3}
          onStart={() => {
            updateGasStationData({ type: 'loading' });
          }}
          onReady={({ distance, duration }) => {
            updateGasStationData({
              type: 'success',
              data: { distance, duration, station: route.station },
            });
          }}
        />
      )}
    </>
  );
};

export default GasStationMapRoute;
