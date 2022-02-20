import React from 'react';
import { View } from 'react-native';
import FontAwesomeButton from '../FontAwesomeButton';
import styles from '../../styles/ChapterStyles';
import colors from '../../styles/colors.json';
import MaterialButton from '../MaterialButton';
import { changeSetting, getAudioRepeatSetting } from '../../utils/SettingsUtils';

class AudioControls extends React.Component {
  constructor() {
    super();
    this.speedIncrement = 0.25;
    this.minSpeed = 0.75;
    this.maxSpeed = 1.75;
  }

  render() {
    const orientationStyle = this.props.isPortrait
      ? styles.audioControlContainerPortrait
      : styles.audioControlContainerLandscape;
    return (
      <View style={{ ...styles.audioControlContainer, ...orientationStyle }}>
        <MaterialButton
          text={this.props.speed.toString() + 'x'}
          textStyle={{ color: colors.tertiary, fontWeight: 'bold' }}
          onPress={async () => {
            let newSpeed = this.props.speed + this.speedIncrement;
            if (newSpeed > this.maxSpeed) {
              newSpeed = this.minSpeed;
            }
            this.props.updateSpeed(newSpeed);
          }}
          buttonStyle={this.props.isPortrait ? { width: 60 } : { width: 80 }}
        />
        <FontAwesomeButton
          iconName="step-backward"
          iconSize={this.props.isPortrait ? 40 : 30}
          onPress={this.props.onBackward}
          buttonStyle={this.props.isPortrait ? { width: 80 } : { width: 60 }}
          iconStyle={{ color: colors.tertiary }}
        />
        <FontAwesomeButton
          iconName={this.props.paused ? 'play-circle' : 'pause-circle'}
          iconSize={this.props.isPortrait ? 80 : 60}
          onPress={this.props.onPauseButton}
          buttonStyle={this.props.isPortrait ? { width: 100 } : { width: 80 }}
          iconStyle={{ color: colors.primary }}
        />
        <FontAwesomeButton
          iconName="step-forward"
          iconSize={this.props.isPortrait ? 40 : 30}
          onPress={this.props.onForward}
          buttonStyle={this.props.isPortrait ? { width: 80 } : { width: 60 }}
          iconStyle={{ color: colors.tertiary }}
        />
        <MaterialButton
          iconName={this.props.shouldRepeat ? 'repeat' : 'repeat-off'}
          iconSize={this.props.isPortrait ? 20 : 20}
          onPress={async () => {
            try {
              changeSetting('repeat', !this.props.shouldRepeat);
              this.props.setShouldRepeat(!this.props.shouldRepeat);
            } catch (error) {
              console.log(error);
            }
          }}
          buttonStyle={this.props.isPortrait ? { width: 40 } : { width: 60 }}
          iconStyle={
            this.props.shouldRepeat
              ? { color: colors.tertiary }
              : { color: colors.secondary }
          }
        />
      </View>
    );
  }

  async componentDidMount() {
    const shouldRepeat = await getAudioRepeatSetting();
    this.props.setShouldRepeat(shouldRepeat);
  }
}

export default AudioControls;
