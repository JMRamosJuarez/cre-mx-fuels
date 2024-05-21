import { useAppSelector } from '@core/presentation/redux';

export const useSelectedStation = () =>
  useAppSelector(({ gasStationsReducer }) => gasStationsReducer.station);
