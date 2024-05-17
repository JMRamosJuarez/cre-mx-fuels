import { StyleProp, ViewStyle } from 'react-native';

export default interface ProgressBarProps {
  readonly style?: StyleProp<ViewStyle>;
  readonly title: (progress: number) => string;
  readonly progress: number;
}
