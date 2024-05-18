import GasStationRoute from '@fuels/domain/entities/gas_station_route';

type GasStationRouteData = {
  readonly color: string;
  readonly route?: GasStationRoute;
};

export default GasStationRouteData;
