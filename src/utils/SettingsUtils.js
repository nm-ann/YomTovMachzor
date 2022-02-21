import AsyncStorage from '@react-native-community/async-storage';

export async function getSettings() {
  let [block, ashk] = await Promise.all([getLineSetting(), getAshkSetting()]);
  return {
    block: block,
    ashk: ashk,
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

export async function getLineSetting() {
  return getSetting('block', true);
}

export async function getAshkSetting() {
  return getSetting('ashk', true);
}

export async function getAudioRepeatSetting() {
  return getSetting('repeat', false);
}

export async function changeSetting(field, value) {
  await AsyncStorage.setItem(field, value.toString());
}
