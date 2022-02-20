import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/HeaderStyles';
import * as strings from '../../utils/strings.json';

class MainScreenHeader extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.mainScreenHeaderText}>{strings.appName}</Text>
      </View>
    );
  }
}
export default MainScreenHeader;
