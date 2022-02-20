import React from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesomeButton from '../components/FontAwesomeButton';
import * as Playlist from '../utils/Playlist';
import styles from '../styles/SectionMenuStyles';
import * as colors from '../styles/colors.json';

class AddToPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      isLoaded: false,
      modalVisible: false,
      name: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadPlaylists = this.loadPlaylists.bind(this);
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.closeModal()}>
          <View
            style={{
              backgroundColor: 'white',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: colors.primary, fontWeight: 'bold', fontSize: 20}}>
              Name this playlist.
            </Text>
            <TextInput
              style={{
                width: '80%',
                borderBottomColor: colors.tertiary,
                borderBottomWidth: 1,
                padding: 0,
              }}
              onChangeText={(value) => this.setState({name: value})}
              value={this.state.name}
            />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <FontAwesomeButton
                text="Close"
                textStyle={{
                  color: colors.primary,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  this.closeModal();
                  this.setState({name: ''});
                }}
              />
              <FontAwesomeButton
                text="Save"
                textStyle={{
                  color: colors.primary,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
                onPress={async () => {
                  if (this.state.name.trim()) {
                    // if the playlist already exists
                    if (
                      this.state.playlists.findIndex(
                        (e) => e.title === this.state.name.trim(),
                      ) !== -1
                    ) {
                      alert('That playlist already exists.');
                    } else {
                      await Playlist.addItemToPlaylist(this.state.name, {
                        collection: this.props.route.params.collection,
                        title: this.props.route.params.title,
                        chapterNum: this.props.route.params.chapterNum,
                      });
                      this.loadPlaylists();
                      this.closeModal();
                      this.props.navigation.goBack();
                    }
                  }
                }}
              />
            </View>
          </View>
        </Modal>

        <FontAwesomeButton
          onPress={() => {
            this.openModal();
          }}
          text="New Playlist"
          buttonStyle={{...styles.button, backgroundColor: colors.primary}}
          textStyle={{...styles.buttonText, color: colors.secondary}}
        />
        {this.state.isLoaded ? (
          <FlatList
            style={styles.container}
            data={this.state.playlists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View style={styles.buttonContainer} key={index}>
                  <FontAwesomeButton
                    onPress={() => {
                      Playlist.addItemToPlaylist(item.title, {
                        collection: this.props.route.params.collection,
                        title: this.props.route.params.title,
                        chapterNum: this.props.route.params.chapterNum,
                      });
                      this.props.navigation.goBack();
                    }}
                    text={item.title}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                  />
                </View>
              );
            }}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  componentDidMount() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    Playlist.getAllPlaylists().then((playlists) => {
      this.setState({
        playlists: playlists,
        isLoaded: true,
      });
    });
  }
}

export default AddToPlaylist;
