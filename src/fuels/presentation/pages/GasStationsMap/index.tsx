import React, { useCallback, useEffect, useRef, useState } from 'react';

import MapRegion from '@fuels/domain/entities/map_region';
import { useGetMapRegionAction } from '@fuels/presentation/redux/actions';
import numbro from 'numbro';
import { Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const GasStationsMap: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const [mapRegion, updateMapRegion] = useState<MapRegion | undefined>();

  const getMapRegion = useGetMapRegionAction();

  const getStations = useCallback(
    async ({ zoom }: { readonly zoom: number }) => {
      try {
        const { location, stations } = await getMapRegion(2000);

        const latitudes = stations.map(place => place.location.lat);
        const longitudes = stations.map(place => place.location.lng);

        const minLat = Math.min(...latitudes, location.lat);
        const maxLat = Math.max(...latitudes, location.lat);
        const minLng = Math.min(...longitudes, location.lng);
        const maxLng = Math.max(...longitudes, location.lng);

        const latitude = (minLat + maxLat) / 2;
        const longitude = (minLng + maxLng) / 2;

        const distanceLat = maxLat - minLat;
        const distanceLng = maxLng - minLng;

        const latitudeDelta = distanceLat * zoom; // Adjust factor as needed
        const longitudeDelta = distanceLng * zoom; // Adjust factor as needed

        mapRef.current?.animateToRegion(
          { latitude, longitude, latitudeDelta, longitudeDelta },
          750,
        );

        updateMapRegion({ location, stations });
      } catch (error) {
        console.log('ERROR: ', JSON.stringify(error, null, '\t'));
      }
    },
    [getMapRegion],
  );

  useEffect(() => {
    getStations({ zoom: 1.2 });
  }, [getStations]);

  return (
    <MapView ref={mapRef} style={{ flex: 1 }}>
      {mapRegion && (
        <Marker
          key={'my-location'}
          title={'My location'}
          pinColor={'blue'}
          coordinate={{
            latitude: mapRegion.location.lat,
            longitude: mapRegion.location.lng,
          }}
        />
      )}
      {mapRegion?.stations?.map(station => {
        return (
          <Marker
            key={`${station.id}-${station.creId}`}
            coordinate={{
              latitude: station.location.lat,
              longitude: station.location.lng,
            }}>
            <Callout>
              <Text>{station.name}</Text>
              <Text>{`Distance: ${numbro(station.distance / 1000).format({
                mantissa: 2,
                trimMantissa: false,
              })} Km.`}</Text>
              {station.prices.map(price => {
                return (
                  <Text key={price.type}>{`${price.type}: ${numbro(
                    price.price,
                  ).formatCurrency({
                    mantissa: 2,
                    trimMantissa: false,
                  })}`}</Text>
                );
              })}
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default GasStationsMap;
