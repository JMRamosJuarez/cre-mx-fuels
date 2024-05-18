import React, { useEffect, useRef } from 'react';

import { useRegionMapper } from '@core/presentation/hooks';
import GasStationBottomSheet from '@fuels/presentation/components/GasStationBottomSheet';
import GasStationMapRoute from '@fuels/presentation/components/GasStationMapRoute';
import { mapStyles } from '@fuels/presentation/pages/GasStationsMap/map_style';
import {
  useGetMapRegionAction,
  useUpdateRouteDataAction,
} from '@fuels/presentation/redux/actions';
import { useMapRegion } from '@fuels/presentation/redux/selectors/region';
import { colors } from '@theme/colors';
import { Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const getRegion = useGetMapRegionAction();

  useEffect(() => {
    getRegion(3000);
  }, [getRegion]);

  const mapRegion = useMapRegion();

  const regionMapper = useRegionMapper();

  useEffect(() => {
    if (mapRegion) {
      const { location, stations } = mapRegion;

      const latitudes = stations.map(place => place.location.latitude);
      const longitudes = stations.map(place => place.location.longitude);

      const region = regionMapper({
        latitudes: [...latitudes, location.latitude],
        longitudes: [...longitudes, location.longitude],
      });

      mapRef.current?.animateToRegion(region, 750);
    }
  }, [mapRegion, regionMapper]);

  const updateRouteData = useUpdateRouteDataAction();

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        customMapStyle={mapStyles.night}>
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
        {mapRegion?.stations?.map(station => {
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
      <GasStationBottomSheet
        displayRoute={({ station, origin, destination }) => {
          updateRouteData({
            color: colors.green['300'],
            route: { station, origin, destination },
          });

          const region = regionMapper({
            zoom: 1.5,
            latitudes: [origin.latitude, destination.latitude],
            longitudes: [origin.longitude, destination.longitude],
          });

          mapRef.current?.animateToRegion(region, 750);
        }}
      />
    </>
  );
};

export default GasStationsMap;
