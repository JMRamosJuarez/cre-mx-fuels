import React from 'react';

import GasStationMark from '@fuels/presentation/components/GasStationMark';
import GasStationsMarkersProps from '@fuels/presentation/components/GasStationsMarkers/props';
import { useGasStationsMapRegion } from '@fuels/presentation/redux/selectors/gas_stations_map_region';
import { Marker } from 'react-native-maps';

const Markers: React.FC<GasStationsMarkersProps> = ({
  onGasStationSelected,
}) => {
  const { origin, stations } = useGasStationsMapRegion();

  return (
    <>
      {stations.map((station, index) => {
        return (
          <Marker
            key={`${station.id}-${station.creId}`}
            identifier={`${station.id}-${station.creId}`}
            coordinate={station.location}
            onPress={() => onGasStationSelected({ index, origin, station })}>
            <GasStationMark station={station} />
          </Marker>
        );
      })}
    </>
  );
};

export default Markers;
