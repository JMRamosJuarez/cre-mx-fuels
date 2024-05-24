export default interface AppXMLParser {
  parse<T>(xml: string): T;
}
