import React, { useEffect, useRef } from 'react';

import GasStationMapRoute from '@fuels/presentation/components/GasStationMapRoute';
import GasStationMark from '@fuels/presentation/components/GasStationMark';
import GasStations from '@fuels/presentation/components/GasStations';
import { mapStyles } from '@fuels/presentation/pages/GasStationsMap/map_style';
import {
  useGetMapRegionAction,
  useSelectGasStationAction,
  useUpdateMapRouteAction,
} from '@fuels/presentation/redux/actions';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { colors } from '@theme/colors';
import { FlatList, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const stations = useRef<FlatList>(null);

  const safeArea = useSafeAreaInsets();

  const getRegion = useGetMapRegionAction();

  useEffect(() => {
    getRegion(3000);
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

  const updateMapRoute = useUpdateMapRouteAction();

  const selectGasStation = useSelectGasStationAction();

  return (
    <>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        toolbarEnabled={false}
        customMapStyle={mapStyles.night}
        initialRegion={{
          latitude: 23.6345, // Latitude of the center of Mexico
          longitude: -102.5528, // Longitude of the center of Mexico
          latitudeDelta: 30.0, // Height of the region to show Mexico
          longitudeDelta: 30.0, // Width of the region to show Mexico
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
        {mapRegion?.stations?.map((item, index) => {
          return (
            <GasStationMark
              key={`${item.id}-${item.creId}`}
              station={item}
              onPress={station => {
                selectGasStation(station);
                updateMapRoute({
                  color: 'transparent',
                  data: {
                    origin: mapRegion.location,
                    destination: station.location,
                  },
                });
                stations.current?.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
            />
          );
        })}
        <GasStationMapRoute />
      </MapView>
      <GasStations
        ref={stations}
        selectStation={station => {
          if (mapRegion?.stations) {
            selectGasStation(station);
            updateMapRoute({
              color: 'transparent',
              data: {
                origin: mapRegion.location,
                destination: station.location,
              },
            });
            mapRef.current?.animateToRegion({
              ...station.location,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            });
          }
        }}
        displayRoute={station => {
          if (mapRegion) {
            selectGasStation(station);
            updateMapRoute({
              color: colors.green['300'],
              data: {
                origin: mapRegion.location,
                destination: station.location,
              },
            });
            mapRef.current?.fitToCoordinates(
              [mapRegion.location, station.location],
              {
                edgePadding: {
                  top: safeArea.top + 64,
                  left: 16,
                  right: 16,
                  bottom: 16 + 295 + 38,
                },
                animated: true,
              },
            );
          }
        }}
      />
    </>
  );
};

export default GasStationsMap;
