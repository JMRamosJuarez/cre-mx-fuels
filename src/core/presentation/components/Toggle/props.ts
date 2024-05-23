import { StyleProp, ViewStyle } from 'react-native';

export default interface ToggleProps {
  readonly style?: StyleProp<ViewStyle>;
  readonly value: boolean;
  readonly onPress: (value: boolean) => void;
}
