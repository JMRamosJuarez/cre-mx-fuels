import React, { useEffect, useRef } from 'react';

import { useRegionMapper } from '@core/presentation/hooks';
import GasStationBottomSheet from '@fuels/presentation/components/GasStationBottomSheet';
import GasStationMapRoute from '@fuels/presentation/components/GasStationMapRoute';
import {
  useGetMapRegionAction,
  useUpdateRouteDataAction,
} from '@fuels/presentation/redux/actions';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const getRegion = useGetMapRegionAction();

  useEffect(() => {
    getRegion(2000);
  }, [getRegion]);

  const mapRegion = useMapRegion();

  const mapper = useRegionMapper();

  useEffect(() => {
    if (mapRegion) {
      const { location, stations } = mapRegion;

      const latitudes = stations.map(place => place.location.latitude);
      const longitudes = stations.map(place => place.location.longitude);

      const { latitude, longitude, latitudeDelta, longitudeDelta } = mapper({
        latitudes: [...latitudes, location.latitude],
        longitudes: [...longitudes, location.longitude],
      });

      mapRef.current?.animateToRegion(
        { latitude, longitude, latitudeDelta, longitudeDelta },
        750,
      );
    }
  }, [mapRegion, mapper]);

  const updateRouteData = useUpdateRouteDataAction();

  return (
    <>
      <MapView ref={mapRef} style={StyleSheet.absoluteFill}>
        {mapRegion && (
          <Marker
            key={'my-location'}
            title={'My location'}
            pinColor={'blue'}
            coordinate={{
              latitude: mapRegion.location.latitude,
              longitude: mapRegion.location.longitude,
            }}
          />
        )}
        {mapRegion?.stations?.map(station => {
          return (
            <Marker
              key={`${station.id}-${station.creId}`}
              title={station.name}
              coordinate={{
                latitude: station.location.latitude,
                longitude: station.location.longitude,
              }}
              onPress={() => {
                updateRouteData({
                  color: 'transparent',
                  route: {
                    station,
                    origin: mapRegion.location,
                    destination: station.location,
                  },
                });
              }}
            />
          );
        })}
        <GasStationMapRoute />
      </MapView>
      <GasStationBottomSheet
        displayRoute={({ station, origin, destination }) => {
          updateRouteData({
            color: 'gray',
            route: { station, origin, destination },
          });

          const { latitude, longitude, latitudeDelta, longitudeDelta } = mapper(
            {
              latitudes: [origin.latitude, destination.latitude],
              longitudes: [origin.longitude, destination.longitude],
            },
          );

          mapRef.current?.animateToRegion(
            { latitude, longitude, latitudeDelta, longitudeDelta },
            750,
          );
        }}
      />
    </>
  );
};

export default GasStationsMap;
