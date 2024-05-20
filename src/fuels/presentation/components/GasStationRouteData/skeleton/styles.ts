import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  item: { flex: 1, marginHorizontal: 12 },
  title: { alignSelf: 'center', marginVertical: 2 },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
  },
});
