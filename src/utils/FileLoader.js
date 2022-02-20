import * as RNFS from 'react-native-fs';
import {Platform} from 'react-native';

export const loadFiles = async (filePath) => {
  try {
    if (Platform.OS === 'android') {
      return await loadAndroidFiles(filePath);
    } else {
      return await loadIOSFiles(filePath);
    }
  } catch (err) {
    return null;
  }
};

const loadAndroidFiles = async (filePath) => {
  try {
    let file = await RNFS.readFileAssets(filePath);
    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const loadIOSFiles = async (filePath) => {
  try {
    let file = await RNFS.readFile(`${RNFS.MainBundlePath}/${filePath}`);
    return JSON.parse(file);
  } catch (err) {
    return null;
  }
};
