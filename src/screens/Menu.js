import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import FontAwesomeButton from '../components/FontAwesomeButton';
import * as strings from '../utils/strings.json';
import * as menuItems from '../utils/menu/menu.json';
import colors from '../styles/colors.json';
import * as mainMenu from '../utils/menu/mainMenu.json';
import * as Playlist from '../utils/Playlist';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      isLoaded: false,
    };

    this.loadPlaylists = this.loadPlaylists.bind(this);
  }

  render() {
    return (
      <View>
        {!this.state.isLoaded ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={styles.container}
            data={mainMenu.default}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <FontAwesomeButton
                  text={strings[item.title]}
                  iconName={item.iconName}
                  iconSize={28}
                  iconStyle={styles.icon}
                  buttonStyle={{...styles.button}}
                  textStyle={styles.text}
                  onPress={() =>
                    this.props.navigation.navigate(item.nextScreen, {
                      title: strings[item.title],
                      chapterList:
                        item.title === 'playlist'
                          ? this.state.playlists
                          : menuItems[item.title],
                    })
                  }
                />
              );
            }}
          />
        )}
      </View>
    );
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.loadPlaylists();
      },
    );

    this.loadPlaylists();
  }

  loadPlaylists() {
    Playlist.getAllPlaylists().then((playlists) => {
      if (playlists.length === 0) {
        playlists = [];
      }
      this.setState({
        playlists: playlists,
        isLoaded: true,
      });
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: colors.secondary,
  },
  icon: {
    backgroundColor: colors.tertiary,
    color: colors.secondary,
    borderRadius: 50,
    width: 50,
    padding: 10,
    aspectRatio: 1,
    textAlign: 'center',
  },
  text: {
    color: colors.tertiary,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Menu;
