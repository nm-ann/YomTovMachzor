import React from 'react';
import {View} from 'react-native';
import gematriya from 'gematriya';
import TouchableText from './TouchableText';

class InlineChapterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.selectText = this.selectText.bind(this);
    this.selectText(0);
    this.text = [];
    for (let i = 0; i < this.props.hebrewText.length * 2; i++) {
      if (i % 2 == 0) {
        this.text.push(this.props.hebrewText[Math.floor(i / 2)]);
      } else {
        this.text.push(this.props.englishText[Math.floor(i / 2)]);
      }
    }
  }

  render() {
    return (
      <View>
        {this.props.hebrewOnly
          ? this.props.hebrewText.map((line, index) => {
              let lineNum = gematriya(index + 1, {punctuate: false});
              let isSelected = index === this.props.selectedIndex;
              return (
                <TouchableText
                  index={index}
                  lineNum={lineNum}
                  text={line}
                  selected={isSelected}
                  onSelect={this.selectText}
                  style={{textAlign: 'right'}}
                  key={index}
                />
              );
            })
          : this.text.map((line, index) => {
              let lineIndex = Math.floor(index / 2);
              let lineNum =
                index % 2 == 0
                  ? gematriya(lineIndex + 1, {punctuate: false})
                  : lineIndex + 1;
              let isSelected = lineIndex === this.props.selectedIndex;
              return (
                <TouchableText
                  index={lineIndex}
                  lineNum={lineNum}
                  text={line}
                  selected={isSelected}
                  onSelect={this.selectText}
                  style={
                    index % 2 == 0 ? {textAlign: 'right'} : {textAlign: 'left'}
                  }
                  key={index}
                />
              );
            })}
      </View>
    );
  }

  selectText(index) {
    this.props.onSelect(index);
  }
}

export default InlineChapterDisplay;
