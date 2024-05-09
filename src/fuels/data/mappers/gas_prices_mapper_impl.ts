import GasPriceDbModel from '@fuels/data/models/gas_price_db_model';
import GasPricesXmlModel from '@fuels/data/models/gas_prices_xml_model';
import GasPrice from '@fuels/domain/entities/gas_price';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesMapper from '@fuels/domain/mappers/gas_prices_mapper';

export default class GasPricesMapperImpl implements GasPricesMapper {
  mapMapXmlModel(model: GasPricesXmlModel): GasPrices {
    const prices: GasPrice[] = Array.isArray(model.gas_price)
      ? model.gas_price.map(p => ({
          type: p['@_type'] || '-',
          price: p['#text'] || 0,
        }))
      : [
          {
            type: model.gas_price['@_type'] || '-',
            price: model.gas_price['#text'] || 0,
          },
        ];
    return {
      gasStationId: model['@_place_id'] || '-',
      prices,
    };
  }

  mapMapDbModel(model: GasPriceDbModel): GasPrice {
    return {
      type: model.type || '-',
      price: model.price || 0,
    };
  }
}
