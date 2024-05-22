import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 8,
    marginHorizontal: 24,
  },
  barContainer: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  barBackground: {
    height: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  progressIndicator: {
    position: 'absolute',
    top: -4,
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    marginVertical: 4,
    marginHorizontal: 16,
  },
});
