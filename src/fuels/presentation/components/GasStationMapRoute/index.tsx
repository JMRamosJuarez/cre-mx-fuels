import React from 'react';

import AppError, { AppErrorType } from '@core/domain/entities/app_error';
import { useUpdateGasStationRouteDataAction } from '@fuels/presentation/redux/actions';
import { useMapRoute } from '@fuels/presentation/redux/selectors/route';
import { useSelectedStation } from '@fuels/presentation/redux/selectors/station';
import { Config } from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';

const GasStationMapRoute: React.FC = () => {
  const updateGasStationData = useUpdateGasStationRouteDataAction();

  const { color, data } = useMapRoute();

  const station = useSelectedStation();

  return (
    <>
      {data && station && (
        <MapViewDirections
          apikey={Config.GOOGLE_MAPS_API_KEY || '-'}
          origin={data.origin}
          destination={data.destination}
          strokeColor={color}
          strokeWidth={3}
          onError={() => {
            updateGasStationData({
              station: station,
              data: {
                type: 'error',
                error: new AppError(AppErrorType.UNKNOWN_ERROR),
              },
            });
          }}
          onReady={({ distance, duration }) => {
            updateGasStationData({
              station: station,
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
