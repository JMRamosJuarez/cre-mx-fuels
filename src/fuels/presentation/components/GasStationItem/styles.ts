import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { marginHorizontal: 8 },
  title: {
    fontSize: 16,
    lineHeight: 22,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  prices: { flexDirection: 'row', alignItems: 'center' },
  price: { flex: 1, marginHorizontal: 1 },
  about: {
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  aboutLink: { textDecorationLine: 'underline' },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 48,
    margin: 12,
  },
  outlineButton: {
    borderWidth: 1,
  },
  buttonLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    marginHorizontal: 8,
  },
});
