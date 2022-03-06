import React from 'react';
import {Text} from 'react-native';
import styles from '../../styles/ChapterTextStyles';

class TouchableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    };
  }

  render() {
    return (
      <Text
        suppressHighlighting={true}
        // initial press
        onResponderGrant={() => {
          this.setState({isPressed: true});
          setTimeout(() => this.setState({isPressed: false}), 500);
        }}
        // if user moves finger away while pressed
        onResponderTerminate={() => {
          this.setState({isPressed: false});
        }}
        // release
        onPress={() => {
          this.setState({isPressed: false});
          this.props.onSelect(this.props.index);
        }}
        style={[
          this.state.isPressed
            ? styles.pressed
            : this.props.selected
            ? styles.selected
            : styles.unselected,
          styles.text,
          this.props.showSmallText ? styles.smallText : styles.bigText,
          this.props.style,
        ]}>
        {`${this.props.text} `}
      </Text>
    );
  }
}

export default TouchableText;
