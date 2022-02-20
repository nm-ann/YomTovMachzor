import React from 'react';
import {View} from 'react-native';
import gematriya from 'gematriya';
import TouchableText from './TouchableText';

class BlockChapterText extends React.Component {
  constructor(props) {
    super(props);
    this.selectText = this.selectText.bind(this);
    this.selectText(0);
  }

  render() {
    return (
      <Text style={this.props.isParagraph ?
          { flexDirection: 'row-reverse', flexWrap: 'wrap' }
        :
          {}}>
        {this.props.text.map((line, index) => {
          let lineNum = this.props.isHebrew
            ? gematriya(index + 1, {punctuate: false})
            : index + 1;
          let isSelected = index === this.props.selectedIndex;
          return (
            <TouchableText
              index={index}
              lineNum={lineNum}
              text={line}
              selected={isSelected}
              onSelect={this.selectText}
              style={
                this.props.isHebrew ? {textAlign: 'right'} : {textAlign: 'left'}
              }
              key={index}
            />
          );
        })}
      </Text>
    );
  }

  selectText(index) {
    this.props.onSelect(index);
  }
}

export default BlockChapterText;
