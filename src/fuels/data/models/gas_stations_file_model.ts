import GasStationXmlModel from '@fuels/data/models/gas_station_xml_model';

type GasStationsFileModel = {
  readonly places?: {
    readonly place?: GasStationXmlModel[];
  };
};

export default GasStationsFileModel;
