import React, { useEffect, useRef } from 'react';

import { calculateEdgeCoordinates } from '@core/presentation/hooks';
import {
  GAS_STATION_ITEM_HEIGHT,
  GOOGLE_MAPS_LOGO_HEIGHT,
  ITEM_MARGIN,
  MAP_PADDING_BOTTOM,
} from '@fuels/domain/entities';
import GasStationMapRoute from '@fuels/presentation/components/GasStationMapRoute';
import GasStationMark from '@fuels/presentation/components/GasStationMark';
import GasStations from '@fuels/presentation/components/GasStations';
import RegionSelector from '@fuels/presentation/components/RegionSelector';
import { mapStyles } from '@fuels/presentation/pages/GasStationsMap/map_style';
import { styles } from '@fuels/presentation/pages/GasStationsMap/styles';
import {
  useGetMapRegionAction,
  useSelectGasStationAction,
  useUpdateMapRouteAction,
} from '@fuels/presentation/redux/actions';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { colors } from '@theme/colors';
import { FlatList, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const stationsRef = useRef<FlatList>(null);

  const safeArea = useSafeAreaInsets();

  const getRegion = useGetMapRegionAction();

  useEffect(() => {
    getRegion(3000);
  }, [getRegion]);

  const mapRegion = useMapRegion();

  const updateMapRoute = useUpdateMapRouteAction();

  const selectGasStation = useSelectGasStationAction();

  useEffect(() => {
    if (mapRegion) {
      const { location, distance } = mapRegion;
      const { north, south, east, west } = calculateEdgeCoordinates(
        location,
        distance,
      );
      mapRef.current?.fitToCoordinates([north, south, east, west], {
        animated: true,
        edgePadding: {
          top: safeArea.top + 64,
          left: 32,
          right: 32,
          bottom: 16 + MAP_PADDING_BOTTOM,
        },
      });
    }
  }, [mapRegion, safeArea.top]);

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
        {mapRegion?.location && (
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
            <Marker
              key={`${item.id}-${item.creId}`}
              identifier={`${item.id}-${item.creId}`}
              coordinate={item.location}
              onPress={() => {
                selectGasStation(item);
                updateMapRoute({
                  color: 'transparent',
                  data: {
                    origin: mapRegion.location,
                    destination: item.location,
                  },
                });
                stationsRef.current?.scrollToIndex({
                  index,
                  animated: true,
                });
              }}>
              <GasStationMark station={item} />
            </Marker>
          );
        })}
        {mapRegion?.location && (
          <Circle
            center={mapRegion.location}
            radius={mapRegion.distance}
            strokeWidth={1}
            strokeColor={'#1a66ff'}
            fillColor={'rgba(230,238,255,0.5)'}
          />
        )}
        <GasStationMapRoute />
      </MapView>
      <RegionSelector
        style={[
          styles.regionSelector,
          {
            bottom:
              GOOGLE_MAPS_LOGO_HEIGHT + GAS_STATION_ITEM_HEIGHT + ITEM_MARGIN,
          },
        ]}
        start={0.3} // default area of 3km.
        maxRadius={10000} // 10km of max radius.
        updateRegion={radius => {
          getRegion(radius);
        }}
      />
      <GasStations
        ref={stationsRef}
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
                  left: 32,
                  right: 32,
                  bottom: 16 + MAP_PADDING_BOTTOM,
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
