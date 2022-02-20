import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Menu from './src/screens/Menu';
import MainScreenHeader from './src/components/Header/MainScreenHeader';
import ChapterMenu from './src/screens/ChapterMenu';
import SectionMenu from './src/screens/SectionMenu';
import Chapter from './src/screens/Chapter';
import ChapterHeader from './src/components/Header/ChapterHeader';
import AddToPlaylist from './src/screens/AddToPlaylist';
import SettingsMenu from './src/screens/SettingsMenu';
import * as strings from './src/utils/strings.json';
import colors from './src/styles/colors.json';
import styles from './src/styles/HeaderStyles';
import {decode, encode} from 'base-64';
import PlaylistMenu from './src/screens/PlaylistMenu';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const {Screen, Navigator} = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Menu"
            component={Menu}
            options={() => {
              return {
                headerStyle: styles.header,
                headerTitleAlign: 'center',
                headerTitle: () => <MainScreenHeader />,
                headerTintColor: colors.secondary,
              };
            }}
          />
          <Screen
            name="SectionMenu"
            component={SectionMenu}
            options={({route}) => ({
              title: `${route.params.title}`,
              headerStyle: styles.header,
              headerTitleStyle: styles.headerText,
              headerTitleAlign: 'center',
              headerTintColor: colors.secondary,
            })}
          />
          <Screen
            name="ChapterMenu"
            component={ChapterMenu}
            options={({route}) => ({
              title: `${route.params.title}`,
              headerStyle: styles.header,
              headerTitleStyle: styles.headerText,
              headerTitleAlign: 'center',
              headerTintColor: colors.secondary,
            })}
          />
          <Screen
            name="PlaylistMenu"
            component={PlaylistMenu}
            options={({route}) => ({
              title: `${route.params.title}`,
              headerStyle: styles.header,
              headerTitleStyle: styles.headerText,
              headerTitleAlign: 'center',
              headerTintColor: colors.secondary,
            })}
          />
          <Screen
            name="Chapter"
            component={Chapter}
            options={({route}) => ({
              headerTitle: () => (
                <ChapterHeader chapterNum={route.params.title} />
              ),
              headerStyle: styles.header,
              headerTitleStyle: styles.headerText,
              headerTitleAlign: 'center',
              headerTintColor: colors.secondary,
            })}
          />
          <Screen
            name="AddToPlaylist"
            component={AddToPlaylist}
            options={({route}) => ({
              title: strings.addToPlaylist,
              headerStyle: styles.header,
              headerTitleStyle: styles.headerText,
              headerTitleAlign: 'center',
              headerTintColor: colors.secondary,
            })}
          />
          <Screen
            name="SettingsMenu"
            component={SettingsMenu}
            options={({route}) => {
              return {
                title: strings.settingsTitle,
                headerStyle: styles.header,
                headerTitleStyle: styles.headerText,
                headerTitleAlign: 'center',
                headerTintColor: colors.secondary,
              };
            }}
          />
        </Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
