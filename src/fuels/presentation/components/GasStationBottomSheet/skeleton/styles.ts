import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  title: { marginTop: 11, marginBottom: 3, marginHorizontal: 12 },
  subtitle: { marginHorizontal: 12, marginVertical: 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  prices: { flexDirection: 'row', alignItems: 'center' },
  price: { flex: 1, marginHorizontal: 1 },
  about: { marginHorizontal: 1, paddingHorizontal: 12, paddingVertical: 8 },
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
    opacity: 0.5,
  },
  outlineButton: {
    borderWidth: 1,
  },
  buttonLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 8,
  },
});
