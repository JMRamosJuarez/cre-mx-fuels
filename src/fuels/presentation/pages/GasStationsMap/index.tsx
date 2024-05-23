import React, { useCallback, useEffect, useRef } from 'react';

import Location from '@core/domain/entities/location';
import { calculateEdgeCoordinates } from '@core/presentation/hooks';
import {
  GAS_STATION_ITEM_HEIGHT,
  ITEM_MARGIN,
  MAP_PADDING_BOTTOM,
} from '@fuels/domain/entities';
import GasStation from '@fuels/domain/entities/gas_station';
import AreaToggle from '@fuels/presentation/components/AreaToggle';
import GasStationMapRoute from '@fuels/presentation/components/GasStationMapRoute';
import GasStations from '@fuels/presentation/components/GasStations';
import GasStationsArea from '@fuels/presentation/components/GasStationsArea';
import GasStationsMarkers from '@fuels/presentation/components/GasStationsMarkers';
import LocationButton from '@fuels/presentation/components/LocationButton';
import RegionSelector from '@fuels/presentation/components/RegionSelector';
import { mapStyles } from '@fuels/presentation/pages/GasStationsMap/map_style';
import { styles } from '@fuels/presentation/pages/GasStationsMap/styles';
import {
  useGetGasStationsMapRegionAction,
  useSelectGasStationAction,
  useUpdateGasStationRouteAction,
} from '@fuels/presentation/redux/actions';
import { useAppTheme } from '@theme/index';
import { FlatList, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const stationsRef = useRef<FlatList>(null);

  const safeArea = useSafeAreaInsets();

  const { colors } = useAppTheme();

  const getRegion = useGetGasStationsMapRegionAction();

  const updateRegion = useCallback(
    async (radius: number) => {
      try {
        const { distance, origin } = await getRegion(radius);

        const { north, south, east, west } = calculateEdgeCoordinates(
          origin,
          distance,
        );

        mapRef.current?.fitToCoordinates([north, south, east, west], {
          animated: true,
        });
      } catch (_) {}
    },
    [getRegion],
  );

  useEffect(() => {
    // updateRegion(2500);
  }, [updateRegion]);

  const updateRoute = useUpdateGasStationRouteAction();

  const displayRoute = useCallback(
    async ({
      origin,
      station,
    }: {
      readonly origin: Location;
      readonly station: GasStation;
    }) => {
      try {
        updateRoute({ color: colors.orange['500'], origin, station });
        mapRef.current?.fitToCoordinates([origin, station.location], {
          animated: true,
        });
      } catch (_) {}
    },
    [colors, updateRoute],
  );

  const selectGasStation = useSelectGasStationAction();

  return (
    <>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        toolbarEnabled={false}
        mapPadding={{
          top: safeArea.top + 16,
          left: 16,
          right: 16,
          bottom: MAP_PADDING_BOTTOM,
        }}
        customMapStyle={mapStyles.night}
        initialRegion={{
          latitude: 23.6345, // Latitude of the center of Mexico
          longitude: -102.5528, // Longitude of the center of Mexico
          latitudeDelta: 30.0, // Height of the region to show Mexico
          longitudeDelta: 30.0, // Width of the region to show Mexico
        }}>
        <GasStationsMarkers
          onGasStationSelected={({ index, origin, station }) => {
            selectGasStation(station);
            updateRoute({ color: 'transparent', origin, station });
            stationsRef.current?.scrollToIndex({
              index,
              animated: true,
            });
          }}
        />
        <GasStationsArea />
        <GasStationMapRoute />
      </MapView>
      <AreaToggle
        style={{
          position: 'absolute',
          end: 24 + 48,
          bottom: MAP_PADDING_BOTTOM + ITEM_MARGIN,
        }}
      />
      <LocationButton
        style={{
          position: 'absolute',
          end: 24,
          bottom: MAP_PADDING_BOTTOM + ITEM_MARGIN,
        }}
      />
      <RegionSelector
        style={[
          styles.regionSelector,
          {
            bottom: GAS_STATION_ITEM_HEIGHT + ITEM_MARGIN * 3,
          },
        ]}
        start={0.25} // default area of 2.5km.
        maxRadius={10000} // 10km of max radius.
        updateRegion={updateRegion}
      />
      <GasStations
        ref={stationsRef}
        onGasStationSelected={({ origin, station }) => {
          selectGasStation(station);
          updateRoute({ color: 'transparent', origin, station });
          mapRef.current?.animateToRegion({
            ...station.location,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          });
        }}
        displayRoute={displayRoute}
      />
    </>
  );
};

export default GasStationsMap;
