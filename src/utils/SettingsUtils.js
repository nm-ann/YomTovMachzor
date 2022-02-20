import AsyncStorage from '@react-native-community/async-storage';

export async function getSettings() {
  let [specific] = await Promise.all([getSpecificSetting()]);
  return {
    specific: specific,
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

export async function getSpecificSetting() {
  return getSetting('specific', true);
}

export async function changeSetting(field, value) {
  await AsyncStorage.setItem(field, value.toString());
}
