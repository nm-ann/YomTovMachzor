import {StyleSheet} from 'react-native';
import colors from './colors.json';

const styles = StyleSheet.create({
  errorText: {
    margin: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
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
