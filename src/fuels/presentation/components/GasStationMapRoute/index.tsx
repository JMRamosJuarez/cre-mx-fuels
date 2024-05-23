import React from 'react';

import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { useUpdateGasStationRouteDataAction } from '@fuels/presentation/redux/actions';
import { useGasStationMapRoute } from '@fuels/presentation/redux/selectors/route';
import { Config } from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';

const GasStationMapRoute: React.FC = () => {
  const route = useGasStationMapRoute();

  const updateRouteData = useUpdateGasStationRouteDataAction();

  return (
    <>
      {route && (
        <MapViewDirections
          apikey={Config.GOOGLE_MAPS_API_KEY || '-'}
          origin={route.origin}
          destination={route.station.location}
          strokeColor={route.color}
          strokeWidth={3}
          onError={() => {
            updateRouteData({
              station: route.station,
              data: {
                type: 'error',
                error: new AppError(AppErrorType.UNKNOWN_ERROR),
              },
            });
          }}
          onReady={({ distance, duration }) => {
            updateRouteData({
              station: route.station,
              data: {
                type: 'success',
                data: { distance, duration },
              },
            });
          }}
        />
      )}
    </>
  );
};

export default GasStationMapRoute;
