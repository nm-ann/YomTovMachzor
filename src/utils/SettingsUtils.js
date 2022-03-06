import AsyncStorage from '@react-native-community/async-storage';

export async function getSettings() {
  let [hebrew, block, ashk, bg, smallText, speed] = await Promise.all([
    getHebrewSetting(),
    getLineSetting(),
    getAshkSetting(),
    getBackgroundSetting(),
    getSmallTextSetting(),
    getSpeedSetting(),
  ]);
  return {
    hebrew: hebrew,
    block: block,
    ashk: ashk,
    bg: bg,
    smallText: smallText,
    speed: speed,
  };
}

async function getSetting(field, dfault) {
  let setting;
  try {
    const result = await AsyncStorage.getItem(field);
    if (result === null) {
      setting = dfault;
    } else {
      setting = result == 'true';
    }
  } catch (err) {
    console.log(err);
    setting = dfault;
  }
  return setting;
}

async function getSpeedSetting() {
  const dfault = 1.0;
  let setting;
  try {
    const result = await AsyncStorage.getItem('speed');
    setting = parseFloat(result);
    if (isNaN(setting)) {
      setting = dfault;
    } else if (setting < 0.75 || setting > 1.75 || setting % 0.25 !== 0) {
      setting = dfault;
    }
  } catch (err) {
    console.log(err);
    setting = dfault;
  }
  return setting;
}

export async function getHebrewSetting() {
  return true;
}

export async function getLineSetting() {
  return getSetting('block', true);
}

export async function getAshkSetting() {
  return getSetting('ashk', true);
}

export async function getBackgroundSetting() {
  return getSetting('bg', true);
}

export async function getSmallTextSetting() {
  return getSetting('smallText', true);
}

export async function getAudioRepeatSetting() {
  return getSetting('repeat', false);
}

export async function getAudioSpeedSetting() {
  return getSetting('speed', 1.0);
}

export async function changeSetting(field, value) {
  await AsyncStorage.setItem(field, value.toString());
}

export async function resetSettings() {
  changeSetting('block', '');
  changeSetting('ashk', '');
  changeSetting('bg', '');
  changeSetting('smallText', '');
  changeSetting('repeat', '');
  changeSetting('speed', '');
}
