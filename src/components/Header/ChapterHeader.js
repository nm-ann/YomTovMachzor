import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/HeaderStyles';
import * as strings from '../../utils/strings.json';

class ChapterHeader extends React.Component {
  render() {
    return (
      <View style={styles.chapterHeaderContainer}>
        <Text
          style={{
            ...styles.chapterHeaderText,
            ...styles.headerText,
          }}>
          {this.props.chapterNum}
        </Text>
      </View>
    );
  }
}
export default ChapterHeader;
