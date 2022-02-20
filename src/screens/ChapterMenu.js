import React from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import gematriya from 'gematriya';
import * as strings from '../utils/strings.json';
import FontAwesomeButton from '../components/FontAwesomeButton';
import styles from '../styles/ChapterMenuStyles';
import MusicControl from 'react-native-music-control';

class ChapterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.buttonWidth = 75;
    const { width } = Dimensions.get('window');
    this.state = {
      numColumns: Math.floor(width / this.buttonWidth),
    };
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
        {this.props.route.params.chapterList.chapters.length < 1 ? (
          <Text style={styles.errorText}>
            There aren't any chapters in this list.
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
                }}>
                  <FontAwesomeButton
                    onPress={() => {
                      this.props.navigation.navigate('Chapter', {
                        collection: item.collection,
                        title: item.title,
                        chapters: this.props.route.params.chapterList.chapters,
                        chapterNum: item.chapterNum,
                      });
                    }}
                    text={item.title}
                    buttonStyle={styles.buttonContentChapter}
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
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }
}

export default ChapterMenu;
