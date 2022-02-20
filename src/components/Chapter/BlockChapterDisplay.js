import React from 'react';
import {View} from 'react-native';
import BlockChapterText from './BlockChapterText';

class BlockChapterDisplay extends React.Component {
  render() {
    return (
      <View>
        <BlockChapterText
          isParagraph={this.props.isParagraph}
          isHebrew={true}
          text={this.props.hebrewText}
          selectedIndex={this.props.selectedIndex}
          onSelect={this.props.onSelect}
        />
        {this.props.hebrewOnly ? (
          <View />
        ) : (
          <BlockChapterText
            isParagraph={this.props.isParagraph}
            isHebrew={false}
            text={this.props.englishText}
            selectedIndex={this.props.selectedIndex}
            onSelect={this.props.onSelect}
          />
        )}
      </View>
    );
  }
}

export default BlockChapterDisplay;
