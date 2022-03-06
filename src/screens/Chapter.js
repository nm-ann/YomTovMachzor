import React from 'react';
import {View, ActivityIndicator, ScrollView, Platform, Dimensions} from 'react-native';
import BlockChapterDisplay from '../components/Chapter/BlockChapterDisplay';
import InlineChapterDisplay from '../components/Chapter/InlineChapterDisplay';
import * as SettingsUtils from '../utils/SettingsUtils';
import * as FileLoader from '../utils/FileLoader';
import * as RNFS from 'react-native-fs';
import styles from '../styles/ChapterStyles';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';
import AudioControls from '../components/Chapter/AudioControls';
import FontAwesomeButton from '../components/FontAwesomeButton';
import * as SeekChapter from '../utils/SeekChapter';
import * as strings from '../utils/strings.json';
import gematriya from 'gematriya';
import * as ScreenUtils from '../utils/ScreenUtils';
import * as colors from '../styles/colors.json';

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      hebrewOnly: false,
      blockText: false,
      selectedIndex: 0,
      isPaused: true,
      isSeeking: false,
      isBookmarked: false,
      dontAllowBackgroundAudio: false,
      showSmallText: false,
      isPortrait: ScreenUtils.isPortrait(),
      shouldRepeat: false,
      speed: 1.0,
    };
    this.player = undefined;

    this.changeChapter = this.changeChapter.bind(this);
    this.selectIndex = this.selectIndex.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.progressUpdateIndex = this.progressUpdateIndex.bind(this);
    this.seekUpdateIndex = this.seekUpdateIndex.bind(this);
    this.secondsToMillis = this.secondsToMillis.bind(this);
    this.millisToSeconds = this.millisToSeconds.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
    this.loadFiles = this.loadFiles.bind(this);
  }

  render() {
    return (
      <View>
        <View style={
          this.state.isPortrait
            ? styles.chapterAreaPortrait
            : styles.chapterAreaLandscape
        }>
          <ScrollView>
            {this.state.isLoaded ? (
              this.state.blockText ? (
                <BlockChapterDisplay
                  isParagraph={true}
                  hebrewOnly={this.state.hebrewOnly}
                  hebrewText={this.state.hebrew}
                  englishText={this.state.english}
                  showSmallText={this.state.showSmallText}
                  selectedIndex={this.state.selectedIndex}
                  onSelect={this.selectIndex}
                />
              ) : (
                <InlineChapterDisplay
                  hebrewOnly={this.state.hebrewOnly}
                  hebrewText={this.state.hebrew}
                  englishText={this.state.english}
                  showSmallText={this.state.showSmallText}
                  selectedIndex={this.state.selectedIndex}
                  onSelect={this.selectIndex}
                />
              )
            ) : (
              <ActivityIndicator size="large" color={colors.secondary} />
            )}
          </ScrollView>

          {this.state.isLoaded ? (
            <Video
              source={{
                uri: this.state.audioUri,
              }} // Can be a URL or a local file.
              ref={(ref) => {
                this.player = ref;
              }} // Store reference
              audioOnly={true}
              playInBackground={!this.state.dontAllowBackgroundAudio}
              ignoreSilentSwitch={'ignore'}
              paused={this.state.isPaused}
              onProgress={this.progressUpdateIndex}
              onSeek={this.seekUpdateIndex}
              rate={this.state.speed}
              // onLoadStart={console.log}
              // onLoad={() => {
              // }}
              onEnd={() => {
                this.setState({isPaused: true});
                // MusicControl.updatePlayback({
                //   state: MusicControl.STATE_PAUSED,
                // });
                if (this.state.shouldRepeat) {
                  this.selectIndex(0);
                } else {
                  if (this.state.isLoaded) {
                    let nextChapter = SeekChapter.findNextChapter(
                      this.props.route.params.chapters,
                      this.props.route.params.collection,
                      this.props.route.params.chapterNum,
                    );
                    if (nextChapter !== -1) {
                      this.changeChapter(nextChapter);
                    }
                  }
                }
              }}
              onError={console.log}
              // onBuffer={console.log}
              style={{
                width: 0,
                height: 0,
              }}
            />
          ) : (
            <View />
          )}
        </View>
        <AudioControls
          paused={this.state.isPaused}
          isPortrait={this.state.isPortrait}
          speed={this.state.speed}
          updateSpeed={(newSpeed) => {
            this.setState({ speed: newSpeed });
            SettingsUtils.changeSetting('speed', newSpeed);
          }}
          onBackward={() => {
            if (this.state.isLoaded) {
              let nextChapter = SeekChapter.findPrevChapter(
                this.props.route.params.chapters,
                this.props.route.params.collection,
                this.props.route.params.chapterNum,
              );
              if (nextChapter !== -1) {
                this.changeChapter(nextChapter);
              }
            }
          }}
          onPauseButton={this.pauseButton}
          onForward={() => {
            if (this.state.isLoaded) {
              let nextChapter = SeekChapter.findNextChapter(
                this.props.route.params.chapters,
                this.props.route.params.collection,
                this.props.route.params.chapterNum,
              );
              if (nextChapter !== -1) {
                this.changeChapter(nextChapter);
              }
            }
          }}
          shouldRepeat={this.state.shouldRepeat}
          setShouldRepeat={(shouldRepeat) =>
            this.setState({ shouldRepeat: shouldRepeat })
          }
        />
      </View>
    );
  }

  changeChapter(nextChapter) {
    this.setState({
      isPaused: true,
    });
    // MusicControl.resetNowPlaying();
    this.props.navigation.replace('Chapter', {
      title: nextChapter.title,
      collection: nextChapter.collection,
      chapters: this.props.route.params.chapters,
      chapterNum: nextChapter.chapterNum,
    });
  }

  async selectIndex(index) {
    if (this.state.isLoaded) {
      let splits = this.state.ashk
        ? this.state.splitsAshk
        : this.state.splitsSeph;
      let nextTime = Number(splits[index]);
      await this.setStateAsync({ isSeeking: true });
      await this.player.seek(this.millisToSeconds(nextTime), 0);
      this.seekUpdateIndex(this.millisToSeconds(nextTime));
    }
  }

  pauseButton() {
    if (this.state.isPaused) {
      // this.configureMusicNotif();

      this.setState({isPaused: false});
      // MusicControl.updatePlayback({
      //   state: MusicControl.STATE_PLAYING,
      // });
    } else {
      this.setState({isPaused: true});
      // MusicControl.updatePlayback({
      //   state: MusicControl.STATE_PAUSED,
      // });
    }
  }

  async progressUpdateIndex(progress) {
    // console.log('DEBUG: ', this.secondsToMillis(progress.currentTime));
    if (this.state.isLoaded && !this.state.isSeeking) {
      let splits = this.state.ashk
        ? this.state.splitsAshk
        : this.state.splitsSeph;
      let index = this.state.selectedIndex;
      // console.log('index was:' + index);
      let nextTime = Number(splits[index + 1]);
      let prevTime = Number(splits[index]);
      let curTime = this.secondsToMillis(progress.currentTime);
      // console.log(curTime + ", " + prevTime);
      let oldIndex = index;
      if (curTime > nextTime && index < splits.length) {
        index++;
      }
      if (curTime < prevTime && index > 0) {
        index--;
      }
      if (oldIndex !== index) {
        this.setState({selectedIndex: index});
      }
    }
  }

  seekUpdateIndex(seek) {
    let splits = this.state.ashk
      ? this.state.splitsAshk
      : this.state.splitsSeph;
    let index = this.state.selectedIndex;
    let indexTime = Number(splits[index]);
    let seekTime = this.secondsToMillis(seek.seekTime);
    while (seekTime > indexTime && index < splits.length) {
      index++;
      indexTime = Number(splits[index]);
    }
    while (seekTime < indexTime && index > 0) {
      index--;
      indexTime = Number(splits[index]);
    }

    this.setState({selectedIndex: index, isSeeking: false});
  }

  secondsToMillis(seconds) {
    return seconds * 1000;
  }

  millisToSeconds(seconds) {
    return seconds * 0.001;
  }

  setStateAsync = (updater) =>
    new Promise((resolve) => this.setState(updater, resolve));

  async componentDidMount() {
    if (!this.state.isLoaded) {
      await this.updateSettings();

      await this.loadFiles();

      this.props.navigation.setOptions({
        headerRight: () => (
          <FontAwesomeButton
            iconName="plus"
            iconSize={20}
            iconStyle={{paddingRight: 20}}
            onPress={async () => {
              if (!this.state.isPaused) {
                this.pauseButton();
              }
              this.props.navigation.navigate('AddToPlaylist', {
                collection: this.props.route.params.collection,
                title: this.props.route.params.title,
                chapterNum: this.props.route.params.chapterNum,
              });
            }}
          />
        ),
      });

      // this.configureMusicNotif();

      this.setState({isLoaded: true});
      Dimensions.addEventListener('change', () => {
        this.setState({
          isPortrait: ScreenUtils.isPortrait(),
        });
      });
    }
  }

  async updateSettings() {
    let settings = await SettingsUtils.getSettings();

    await this.setStateAsync({
      hebrewOnly: settings.hebrew,
      blockText: settings.block,
      ashk: settings.ashk,
      dontAllowBackgroundAudio: settings.bg,
      showSmallText: settings.smallText,
      speed: settings.speed,
    });
  }

  configureMusicNotif() {
    MusicControl.enableBackgroundMode(true);
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    // Android Specific Options
    // allows the notification to be closed on android when swiped
    MusicControl.enableControl('closeNotification', true, {when: 'paused'});

    // IOS Specific Options
    MusicControl.handleAudioInterruptions(true);

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });

    MusicControl.on('pause', () => {
      this.setState({
        isPaused: true,
      });

      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
    });
    MusicControl.on('play', () => {
      this.setState({
        isPaused: false,
      });
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
      });
    });
    MusicControl.on('nextTrack', () => {
      if (this.state.isLoaded) {
        let nextChapter = SeekChapter.findNextChapter(
          this.props.route.params.chapters,
          this.props.route.params.collection,
          this.props.route.params.chapterNum,
        );
        if (nextChapter !== -1) {
          this.changeChapter(nextChapter);
        }
      }
    });
    MusicControl.on('previousTrack', () => {
      if (this.state.isLoaded) {
        let nextChapter = SeekChapter.findPrevChapter(
          this.props.route.params.chapters,
          this.props.route.params.collection,
          this.props.route.params.chapterNum,
        );
        if (nextChapter !== -1) {
          this.changeChapter(nextChapter);
        }
      }
    });
    MusicControl.on('closeNotification', () => {
      console.log('closed!');
      this.props.navigation.goBack();
    });

    let number = this.state.number;

    MusicControl.setNowPlaying({
      title: strings.appName,
      // artwork: require('../assets/icons/ic_launcher.png'),
      artist: `${strings.chapter} ${number ? number : ''}`,
    });
  }

  async loadFiles() {
    const filePath =
      Platform.OS === 'android'
        ? `textJson/${this.props.route.params.collection}_${this.props.route.params.chapterNum}.json`
        : `${this.props.route.params.collection}_${this.props.route.params.chapterNum}.json`;

    const file = await FileLoader.loadFiles(filePath);
    if (file) {
      const audioType = this.state.ashk
        ? `${strings.audioSuffix1}`
        : `${strings.audioSuffix2}`;
      const audioURI =
        Platform.OS === 'android'
          ? `${this.props.route.params.collection}_${this.props.route.params.chapterNum}_${audioType}`
          : `${RNFS.MainBundlePath}/${this.props.route.params.collection}_${this.props.route.params.chapterNum}_${audioType}.mp3`;

      this.setState({
        number: file.chapterNumber,
        hebrew: file.hebrewText,
        english: this.state.hebrewOnly ? '' : file.englishText,
        splitsAshk: file.splitsAshk,
        splitsSeph: file.splitsSeph,
        audioUri: audioURI,
      });
    }
  }
  
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }
}

export default Chapter;
