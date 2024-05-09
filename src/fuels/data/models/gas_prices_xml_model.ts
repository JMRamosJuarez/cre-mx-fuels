import GasPriceTypeXmlModel from '@fuels/data/models/gas_price_type_xml_model';

type GasPricesXmlModel = {
  readonly '@_place_id': string;
  readonly gas_price: GasPriceTypeXmlModel | GasPriceTypeXmlModel[];
};

export default GasPricesXmlModel;
