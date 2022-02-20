import colors from './colors.json';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  settingsCard: {
    backgroundColor: colors.secondary,
    marginTop: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  settingsTitle: {
    color: colors.tertiary,
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsSubtitle: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.tertiary,
    fontSize: 15,
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    aspectRatio: 1,
    width: 80,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 40,
  },
  buttonSelected: {
    backgroundColor: colors.primary,
  },
  buttonDeselected: {
    backgroundColor: colors.tertiaryDark,
  },
});

export default styles;
