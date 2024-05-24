import AppXMLParser from '@core/domain/data_access/app_xml_parser';
import { XMLParser } from 'fast-xml-parser';

export default class AppXMLParserImpl implements AppXMLParser {
  private _xmlParser?: XMLParser;

  parse<T>(xml: string): T {
    return this.xmlParser.parse(xml);
  }

  private get xmlParser(): XMLParser {
    if (!this._xmlParser) {
      this._xmlParser = new XMLParser({ ignoreAttributes: false });
    }
    return this._xmlParser;
  }
}
