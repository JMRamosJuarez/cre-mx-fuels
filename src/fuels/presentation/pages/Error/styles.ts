import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: { fontSize: 18, textAlign: 'center' },
  button: {
    paddingVertical: 12,
    borderRadius: 48,
    marginHorizontal: 32,
    marginVertical: 16,
  },
  buttonLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    marginHorizontal: 8,
  },
});
