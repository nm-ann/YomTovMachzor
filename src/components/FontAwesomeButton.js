import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors.json';

class FontAwesomeButton extends React.Component {
  render() {
    const iconMargin = this.props.text ? {marginRight: 10} : {marginRight: 0};
    /* <TouchableOpacity delayPressIn={0} onPress={this.props.onPress}> */
    return (
      <TouchableOpacity delayPressIn={0} onPress={this.props.onPress}>
        <View style={{...styles.button, ...this.props.buttonStyle}}>
          {this.props.iconName ? (
            <FontAwesome5
              solid={this.props.solid ? true : false}
              light={this.props.solid ? false : true}
              name={this.props.iconName}
              size={this.props.iconSize}
              style={{...styles.icon, ...this.props.iconStyle, ...iconMargin}}
              color={colors.secondary}
            />
          ) : (
            <View />
          )}
          {this.props.text ? (
            <Text style={{...styles.text, ...this.props.textStyle}}>
              {this.props.text}
            </Text>
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  text: {
    color: colors.secondary,
    fontSize: 15,
  },
});

export default FontAwesomeButton;
