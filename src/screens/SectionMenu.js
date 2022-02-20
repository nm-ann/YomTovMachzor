import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import gematriya from 'gematriya';
import * as strings from '../utils/strings.json';
import FontAwesomeButton from '../components/FontAwesomeButton';
import MusicControl from 'react-native-music-control';
import styles from '../styles/SectionMenuStyles';

class SectionMenu extends React.Component {
  render() {
    const onlyHasOneChapter = [];
    return (
      <View>
        {this.props.route.params.chapterList.length < 1 ? (
          <Text style={styles.errorText}>
            There aren't any items in this list.
          </Text>
        ) : (
          <FlatList
            style={styles.container}
            data={this.props.route.params.chapterList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View style={styles.buttonContainer} key={index}>
                  <FontAwesomeButton
                    onPress={() => {
                      if (
                        onlyHasOneChapter.includes(
                          this.props.route.params.title,
                        )
                      ) {
                        this.props.navigation.navigate('Chapter', {
                          title: strings.chapter,
                          chapters: item.chapters,
                          chapterNum: item.chapters[0],
                          titleNum: item.chapters[0],
                        });
                      } else if (
                        this.props.route.params.title === 'Playlists'
                      ) {
                        this.props.navigation.navigate('PlaylistMenu', {
                          title: item.title,
                          chapterList: item,
                          allPlaylists: this.props.route.params.chapterList,
                        });
                      } else {
                        this.props.navigation.navigate('ChapterMenu', {
                          title: item.title,
                          chapterList: item,
                        });
                      }
                    }}
                    text={item.title}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                  />
                </View>
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
        // MusicControl.stopControl();
        this.setState({refresh: true});
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }
}

export default SectionMenu;
