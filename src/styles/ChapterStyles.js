import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chapterAreaPortrait: {
    height: '75%',
    margin: 20,
    marginBottom: 0,
    display: 'flex',
  },
  chapterAreaLandscape: {
    height: '64%',
    margin: 20,
    marginBottom: 0,
    display: 'flex',
  },
  audioControlContainer: {
    width: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 10, // Android
  },
  audioControlContainerPortrait: {
    height: '22%',
  },
  audioControlContainerLandscape: {
    height: '30%',
  },
});

export default styles;
