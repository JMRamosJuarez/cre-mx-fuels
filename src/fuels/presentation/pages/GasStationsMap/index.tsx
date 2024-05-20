import React, { useEffect, useMemo, useRef } from 'react';

import { useDimensions } from '@core/presentation/hooks';
import GasStationItem from '@fuels/presentation/components/GasStationItem';
import GasStationMapRoute from '@fuels/presentation/components/GasStationMapRoute';
import { mapStyles } from '@fuels/presentation/pages/GasStationsMap/map_style';
import { styles } from '@fuels/presentation/pages/GasStationsMap/styles';
import {
  useGetMapRegionAction,
  useUpdateRouteDataAction,
} from '@fuels/presentation/redux/actions';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { colors } from '@theme/colors';
import { FlatList, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const safeArea = useSafeAreaInsets();

  const getRegion = useGetMapRegionAction();

  useEffect(() => {
    // getRegion(3000);
  }, [getRegion]);

  const mapRegion = useMapRegion();

  useEffect(() => {
    if (mapRegion) {
      const { location, stations } = mapRegion;

      mapRef.current?.fitToCoordinates(
        [location, ...stations.map(i => i.location)],
        {
          edgePadding: {
            top: safeArea.top + 64,
            left: 16,
            right: 16,
            bottom: 295 + 38,
          },
        },
      );
    }
  }, [mapRegion, safeArea.top]);

  const updateRouteData = useUpdateRouteDataAction();

  const {
    screen: { width },
  } = useDimensions();

  const itemWidth = useMemo(() => width - 16 - 32, [width]);

  const stationsRef = useRef<FlatList>(null);

  return (
    <>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        toolbarEnabled={false}
        customMapStyle={mapStyles.night}
        onRegionChangeComplete={region => {
          console.log('REGION: ', region);
        }}>
        {mapRegion && (
          <Marker
            key={'my-location'}
            pinColor={colors.blue['500']}
            coordinate={{
              latitude: mapRegion.location.latitude,
              longitude: mapRegion.location.longitude,
            }}>
            <Callout>
              <Text>{'My location'}</Text>
            </Callout>
          </Marker>
        )}
        {mapRegion?.stations?.map((station, index) => {
          return (
            <Marker
              key={`${station.id}-${station.creId}`}
              title={station.name}
              pinColor={colors.red['500']}
              coordinate={{
                latitude: station.location.latitude,
                longitude: station.location.longitude,
              }}
              onPress={() => {
                stationsRef.current?.scrollToIndex({
                  index,
                  animated: true,
                  viewOffset: 16,
                });
                updateRouteData({
                  color: 'transparent',
                  route: {
                    station,
                    origin: mapRegion.location,
                    destination: station.location,
                  },
                });
              }}>
              <Callout>
                <Text>{station.name}</Text>
              </Callout>
            </Marker>
          );
        })}
        <GasStationMapRoute />
      </MapView>
      {mapRegion?.stations && (
        <FlatList
          ref={stationsRef}
          horizontal
          pagingEnabled
          snapToInterval={width - 32}
          data={mapRegion.stations}
          keyExtractor={station => `${station.id}-${station.creId}`}
          style={styles.stations}
          contentContainerStyle={styles.stationsContent}
          renderItem={({ item }) => {
            return (
              <GasStationItem
                station={item}
                displayRoute={({ station, origin, destination }) => {
                  updateRouteData({
                    color: colors.green['300'],
                    route: { station, origin, destination },
                  });

                  mapRef.current?.fitToCoordinates([origin, destination], {
                    edgePadding: {
                      top: safeArea.top + 64,
                      left: 16,
                      right: 16,
                      bottom: 16 + 295 + 38,
                    },
                    animated: true,
                  });
                }}
              />
            );
          }}
          onMomentumScrollEnd={async ({ nativeEvent: { contentOffset } }) => {
            if (mapRegion?.stations) {
              const index = Math.floor(contentOffset.x / itemWidth);
              const station = mapRegion.stations[index];

              mapRef.current?.animateToRegion({
                ...station.location,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              });
            }
          }}
        />
      )}
    </>
  );
};

export default GasStationsMap;
