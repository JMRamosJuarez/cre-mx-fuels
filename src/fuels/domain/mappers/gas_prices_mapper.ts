import GasPriceDbModel from '@fuels/data/models/gas_price_db_model';
import GasPricesXmlModel from '@fuels/data/models/gas_prices_xml_model';
import GasPrice from '@fuels/domain/entities/gas_price';
import GasPrices from '@fuels/domain/entities/gas_prices';

export default interface GasPricesMapper {
  mapMapXmlModel(model: GasPricesXmlModel): GasPrices;
  mapMapDbModel(model: GasPriceDbModel): GasPrice;
}
