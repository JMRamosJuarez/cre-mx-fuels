import React from 'react';

import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { useUpdateGasStationRouteDataAction } from '@fuels/presentation/redux/actions';
import { useMapRoute } from '@fuels/presentation/redux/selectors/route';
import { Config } from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';

const GasStationMapRoute: React.FC = () => {
  const updateGasStationData = useUpdateGasStationRouteDataAction();

  const { color, data } = useMapRoute();

  return (
    <>
      {data?.station && (
        <MapViewDirections
          apikey={Config.GOOGLE_MAPS_API_KEY || '-'}
          origin={data.origin}
          destination={data.station.location}
          strokeColor={color}
          strokeWidth={3}
          onError={() => {
            updateGasStationData({
              station: data.station,
              data: {
                type: 'error',
                error: new AppError(AppErrorType.UNKNOWN_ERROR),
              },
            });
          }}
          onReady={({ distance, duration }) => {
            updateGasStationData({
              station: data.station,
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
