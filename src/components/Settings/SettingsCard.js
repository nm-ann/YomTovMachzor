import React from 'react';
import {View, Text} from 'react-native';
import FontAwesomeButton from '../FontAwesomeButton';
import styles from '../../styles/SettingsCardStyles';

class SettingsCard extends React.Component {
  render() {
    return (
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>{this.props.title}</Text>
        {this.props.subtitle ? (
          <Text style={styles.settingsSubtitle}>{this.props.subtitle}</Text>
        ) : (
          <View />
        )}
        <View style={styles.buttonArea}>
          <FontAwesomeButton
            text={this.props.leftText ? this.props.leftText : undefined}
            iconName={this.props.leftIcon ? this.props.leftIcon : undefined}
            iconSize={40}
            buttonStyle={
              this.props.leftSelected
                ? {...styles.button, ...styles.buttonSelected}
                : {...styles.button, ...styles.buttonDeselected}
            }
            textStyle={styles.buttonText}
            onPress={this.props.leftSelected ? () => {} : this.props.onPress}
          />
          <FontAwesomeButton
            text={this.props.rightText ? this.props.rightText : ''}
            iconName={this.props.rightIcon ? this.props.rightIcon : undefined}
            iconSize={40}
            elevation={!this.props.leftSelected ? 1 : 5}
            buttonStyle={
              !this.props.leftSelected
                ? {...styles.button, ...styles.buttonSelected}
                : {...styles.button, ...styles.buttonDeselected}
            }
            textStyle={styles.buttonText}
            onPress={this.props.leftSelected ? this.props.onPress : () => {}}
          />
        </View>
      </View>
    );
  }
}

export default SettingsCard;
