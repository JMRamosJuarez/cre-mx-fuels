import GasStationsDatasource from '@fuels/domain/datasources/gas_stations_datasource';
import GasStationsRepository from '@fuels/domain/repositories/gas_stations_repository';

export default interface GasStationsModule {
  readonly dbDatasource: GasStationsDatasource;
  readonly repository: GasStationsRepository;
}
