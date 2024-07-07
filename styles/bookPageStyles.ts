// styles/bookPageStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  bookCover: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
  },
  bookInfo: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  playButton: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  tabs: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 14,
    borderBottomWidth: 2,
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 4,
    textAlign: 'center',
    fontSize: 14,
    borderBottomWidth: 2,
  },
  reviewButton: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderRadius: 8,
  },
});
