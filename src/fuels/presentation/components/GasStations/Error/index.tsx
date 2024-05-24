import React, { useEffect, useMemo, useRef } from 'react';

import { LocationPermissions } from '@core/domain/data_access/permissions';
import { AppErrorType } from '@core/domain/entities/app_error';
import { useDimensions } from '@core/presentation/hooks';
import { styles } from '@fuels/presentation/components/Gasstations/Error/styles';
import GasStationsProps from '@fuels/presentation/components/GasStations/props';
import { useGasStationsMapRegionError } from '@fuels/presentation/redux/selectors/gas_stations_map_region';
import { useAppTheme } from '@theme/index';
import {
  AppState,
  AppStateStatus,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  check as checkPermissions,
  openSettings,
} from 'react-native-permissions';

const GasStationsError: React.FC<GasStationsProps> = ({ updateRegion }) => {
  const { boxShadow, colors } = useAppTheme();

  const {
    screen: { width },
  } = useDimensions();

  const ITEM_WIDTH = useMemo(() => width - 32 - 16, [width]);

  const appState = useRef(AppState.currentState);

  const error = useGasStationsMapRegionError();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        if (
          error.type === AppErrorType.LOCATION_PERMISSIONS_DENIED &&
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // The app has come to the foreground!
          const status = await checkPermissions(LocationPermissions);
          if (status === 'granted') {
            updateRegion();
          }
        }
        appState.current = nextAppState;
      },
    );
    return () => {
      subscription.remove();
    };
  }, [error.type, updateRegion]);

  switch (error.type) {
    case AppErrorType.LOCATION_PERMISSIONS_DENIED:
      return (
        <View
          style={[
            styles.container,
            boxShadow,
            { width: ITEM_WIDTH },
            { backgroundColor: colors.primary['50'] },
          ]}>
          <Text style={styles.message}>
            {
              'In order to show you the nearest\ngas stations we need access to\nyour current location.'
            }
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, { backgroundColor: colors.blue['700'] }]}
            onPress={openSettings}>
            <Text style={[styles.buttonLabel, { color: colors.primary['50'] }]}>
              {'Open settings'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    default:
      return (
        <View
          style={[
            styles.container,
            boxShadow,
            { width: ITEM_WIDTH },
            { backgroundColor: colors.primary['50'] },
          ]}>
          <Text style={styles.message}>
            {'An unexpected error occurred\nplease try again.'}
          </Text>
        </View>
      );
  }
};

export default GasStationsError;
