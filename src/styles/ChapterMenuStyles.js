import {StyleSheet} from 'react-native';
import * as colors from './colors.json';

const styles = StyleSheet.create({
  errorText: {
    margin: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContentChapter: {
    backgroundColor: 'white',
    aspectRatio: 1,
  },
  buttonContentTitle: {
    width: '100%',
    height: 80,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.tertiary,
  },
});

export default styles;
