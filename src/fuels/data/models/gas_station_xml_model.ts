type GasStationXmlModel = {
  readonly '@_place_id'?: string;
  readonly cre_id?: string;
  readonly name?: string;
  readonly location?: {
    readonly x?: number;
    readonly y?: number;
  };
};

export default GasStationXmlModel;
