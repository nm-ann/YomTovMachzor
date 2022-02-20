import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors.json';

class MaterialButton extends React.Component {
  render() {
    const iconMargin = this.props.text ? {marginRight: 10} : {marginRight: 0};
    /* <TouchableOpacity delayPressIn={0} onPress={this.props.onPress}> */
    return (
      <TouchableOpacity delayPressIn={0} onPress={this.props.onPress}>
        <View style={{...styles.button, ...this.props.buttonStyle}}>
          {this.props.iconName ? (
            <Icon
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

export default MaterialButton;
