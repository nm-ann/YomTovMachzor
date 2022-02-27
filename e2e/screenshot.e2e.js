const {execSync} = require('child_process');

const OPTIONS = {
  timeout: 10000,
  killSignal: 'SIGKILL',
};

describe('Screenshot', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should screenshot the menu', async () => {
    const fileName = 'menu';
    execSync(
      `xcrun simctl io booted screenshot $(pwd)/listing/screenshots/ios/${fileName}_${getFolderName(device)}.png`,
      OPTIONS,
    );
  });

  it('should screenshot the chapter menu', async () => {
    const fileName = 'chaptermenu';
    await element(by.text('Mussaf')).tap();
    execSync(
      `xcrun simctl io booted screenshot $(pwd)/listing/screenshots/ios/${fileName}_${getFolderName(device)}.png`,
      OPTIONS,
    );
  });

  it('should screenshot the chapter', async () => {
    const fileName = 'chapter';
    await element(by.text('Mussaf')).tap();
    await element(by.text('Ashrei')).tap();
    execSync(
      `xcrun simctl io booted screenshot $(pwd)/listing/screenshots/ios/${fileName}_${getFolderName(device)}.png`,
      OPTIONS,
    );
  });

  it('should screenshot the settings', async () => {
    const fileName = 'settings';
    await element(by.text('Settings')).tap();
    execSync(
      `xcrun simctl io booted screenshot $(pwd)/listing/screenshots/ios/${fileName}_${getFolderName(device)}.png`,
      OPTIONS,
    );
  });
});

function getFolderName(device) {
  if (device.name.includes('iPad')) {
    return 'ipad';
  } else {
    return 'iphone';
  }
}
