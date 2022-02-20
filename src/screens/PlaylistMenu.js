/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, Button, TouchableOpacity, Dimensions} from 'react-native';
import gematriya from 'gematriya';
import * as strings from '../utils/strings.json';
import FontAwesomeButton from '../components/FontAwesomeButton';
import styles from '../styles/ChapterMenuStyles';
import colors from '../styles/colors.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Playlist from '../utils/Playlist';
import Modal from 'react-native-modal';

class PlaylistMenu extends React.Component {
  constructor(props) {
    super(props);
    this.buttonWidth = 75;
    const {width} = Dimensions.get('window');

    this.state = {
      modalVisible: false,
      numColumns: Math.floor(width / this.buttonWidth),
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    return (
      <View
        onLayout={() => {
          const { width } = Dimensions.get('window');
          this.setState({
            numColumns: Math.floor(width / this.buttonWidth),
          });
        }}>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.closeModal()}>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: 20,
                padding: 20,
              }}>
              Delete "{this.props.route.params.title}"?
            </Text>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <FontAwesomeButton
                text="Cancel"
                textStyle={{
                  color: colors.primary,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  this.closeModal();
                  this.props.navigation.setParams({editMode: false});
                }}
              />
              <FontAwesomeButton
                text="Delete"
                textStyle={{
                  color: 'tomato',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
                onPress={async () => {
                  Playlist.removePlaylist(this.props.route.params.title);
                  const playlistIndex = this.props.route.params.allPlaylists.findIndex(
                    (e) => e.title === this.props.route.params.title,
                  );
                  this.props.route.params.allPlaylists.splice(playlistIndex, 1);
                  this.closeModal();
                  this.props.navigation.goBack();
                }}
              />
            </View>
          </View>
        </Modal>

        <View>
          {this.props.route.params.chapterList.chapters.length < 1 ? (
            <Text style={styles.errorText}>
              There aren't any items in this list.
            </Text>
          ) : (
            <FlatList
              columnWrapperStyle={styles.buttonContainer}
              data={this.props.route.params.chapterList.chapters}
              numColumns={this.state.numColumns}
              keyExtractor={(item, index) => index.toString()}
              key={this.state.numColumns}
              renderItem={({item, index}) => {
                return (
                  <View style={{
                      width: this.buttonWidth,
                      padding: 5,
                    }}
                    key={index}>
                    <FontAwesomeButton
                      onPress={() => {
                        if (!this.props.route.params.editMode) {
                          this.props.navigation.navigate('Chapter', {
                            title: strings.chapter,
                            chapters: this.props.route.params.chapterList
                              .chapters,
                            chapterNum: item,
                            titleNum: item,
                          });
                        }
                      }}
                      text={item.toString()}
                      buttonStyle={styles.buttonContent}
                      textStyle={styles.buttonText}
                    />
                    {this.props.route.params.editMode ? (
                      <TouchableOpacity
                        delayPressIn={0}
                        style={{
                          position: 'absolute',
                          top: 2.5,
                          right: 2.5,
                        }}
                        onPress={async () => {
                          await Playlist.removeItemFromPlaylist(
                            this.props.route.params.title,
                            item,
                          );
                          this.props.route.params.chapterList.chapters.splice(
                            index,
                            1,
                          );
                          this.props.navigation.setParams({
                            editMode: false,
                          });
                          this.props.navigation.setParams({
                            editMode: true,
                          });
                        }}>
                        <View style={{}}>
                          <FontAwesome5
                            solid
                            name="times-circle"
                            size={25}
                            style={{}}
                            color="tomato"
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    );
  }

  componentDidMount() {
    // this.willFocusSubscription = this.props.navigation.addListener(
    //   'focus',
    //   () => {
    //     MusicControl.stopControl();
    //   },
    // );

    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <FontAwesomeButton
              iconName="edit"
              iconSize={20}
              solid={this.props.route.params.editMode}
              onPress={() => {
                const newValue = !this.props.route.params.editMode;
                // Although this is redundant, it fixes a problem on ios probably caused
                // by setParams being asynchronous
                this.props.route.params.editMode = newValue;
                this.props.navigation.setParams({
                  editMode: newValue,
                });
              }}
            />
            <FontAwesomeButton
              iconName="trash-alt"
              iconSize={20}
              onPress={() => this.openModal()}
            />
          </View>
        );
      },
    });
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  componentWillUnmount() {
    // this.willFocusSubscription();
  }
}

export default PlaylistMenu;
