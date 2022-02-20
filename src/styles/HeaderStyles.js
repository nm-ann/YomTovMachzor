import {StyleSheet} from 'react-native';
import * as colors from './colors.json';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
  },
  headerText: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  mainScreenHeaderText: {
    fontFamily: 'StamAshkenazCLM',
    fontSize: 30,
    color: colors.secondary,
  },
  chapterHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  chapterHeaderText: {
    fontSize: 20,
  },
});

export default styles;
