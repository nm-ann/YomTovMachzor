import React from 'react';
import {FlatList} from 'react-native';
import * as SettingsUtils from '../utils/SettingsUtils';
import * as settingCards from '../utils/menu/settingsMenu.json';
import SettingsCard from '../components/Settings/SettingsCard';

class SettingsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        hebrew: false,
        block: false,
        ashk: true,
      },
    };
    this.changeSettings = this.changeSettings.bind(this);
  }
  render() {
    return (
      <FlatList
        // Need to write .default because RN imports json arrays as an object whose keys
        // are indices and values are the array values. The object also has a default key
        // which holds the original array, so that must be used instead.
        data={settingCards.default}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <SettingsCard
              title={item.title}
              subtitle={item.subtitle}
              leftSelected={this.state.settings[item.settingsName]} // because true means only hebrew
              leftText={item.leftText}
              leftIcon={item.leftIcon}
              rightText={item.rightText}
              rightIcon={item.rightIcon}
              onPress={() => {
                this.changeSettings(item.settingsName);
              }}
            />
          );
        }}
      />
    );
  }

  async changeSettings(field) {
    let newState = this.state;
    newState.settings[field] = !this.state.settings[field];
    this.setState(newState, async () => {
      try {
        await SettingsUtils.changeSetting(
          field,
          newState.settings[field].toString(),
        );
      } catch (err) {
        console.log(err);
      }
    });
  }

  async componentDidMount() {
    let settings = await SettingsUtils.getSettings();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      settings: settings,
    });
  }
}

export default SettingsMenu;
