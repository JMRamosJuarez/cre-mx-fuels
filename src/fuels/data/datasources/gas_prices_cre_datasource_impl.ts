import HttpClient from '@core/domain/data_access/http_client';
import GasPricesXmlModel from '@fuels/data/models/gas_prices_xml_model';
import GasPricesDatasource from '@fuels/domain/datasources/gas_prices_datasource';
import GasPrices from '@fuels/domain/entities/gas_prices';
import GasPricesMapper from '@fuels/domain/mappers/gas_prices_mapper';
import { XMLParser } from 'fast-xml-parser';

export default class GasPricesCreDatasourceImpl implements GasPricesDatasource {
  private _xmlParser?: XMLParser;

  constructor(
    private readonly mapper: GasPricesMapper,
    private readonly creHttpClient: HttpClient,
  ) {}

  validateDatasource(): Promise<'available' | 'not-available'> {
    throw new Error(
      'Method "validateDatasource" is not implemented in GasPricesCreDatasourceImpl.',
    );
  }

  saveGasPrices(_: GasPrices): Promise<GasPrices> {
    throw new Error(
      'Method "saveGasPrices" is not implemented in GasPricesCreDatasourceImpl.',
    );
  }

  async getGasPrices(): Promise<GasPrices[]> {
    const xml = await this.creHttpClient.get<string>('/publicaciones/prices');

    const json: {
      readonly places?: {
        readonly place?: GasPricesXmlModel[];
      };
    } = this.xmlParser.parse(xml);

    const models = json.places?.place || [];

    const prices = models.map(model => {
      return this.mapper.mapMapXmlModel(model);
    });

    return prices;
  }

  getGasPricesByStationId(_: string): Promise<GasPrices> {
    throw new Error(
      'Method "getGasPricesByStationId" is not implemented in GasPricesCreDatasourceImpl.',
    );
  }

  deleteGasPrices(): Promise<number> {
    throw new Error(
      'Method "deleteGasPrices" is not implemented in GasPricesCreDatasourceImpl.',
    );
  }

  private get xmlParser(): XMLParser {
    if (!this._xmlParser) {
      this._xmlParser = new XMLParser({ ignoreAttributes: false });
    }
    return this._xmlParser;
  }
}