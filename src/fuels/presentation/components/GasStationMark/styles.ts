import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 0.5,
  },
  price: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  indicator: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
    marginTop: -1,
  },
});
