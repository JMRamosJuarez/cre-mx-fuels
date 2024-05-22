import { ViewStyle } from 'react-native';

export default interface SkeletonProps {
  readonly width: number;
  readonly height: number;
  readonly style?: ViewStyle | ViewStyle[];
}
