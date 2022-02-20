# Leining-App-Template
Use this as a template when building leining apps.

# Set Up
Fork this repo and then run `npx react-native init ProjectName`. Afterward, copy all files except for App.js from the ProjectName folder into this folder. Afterward, you can delete the App.js folder.

# Menus
Modify the following:
- **src/utils/mainMenu.json:** This specifies information for all buttons on the menu. Each button requires a title, and icons, and a string representation of the screen component to which it should navigate.

- **src/utils/menu.json:** This specifies the sections and chapters of each menu option. Each menu option is represented as either an object with a title a list of chapters, or a list of such objects.

- **src/utils/settingsMenu.json:** This specifies information for each of the settings cards. Each card has a title, the name of the setting that it controls, and text for each of the options.

# Utils
Modify the following:
- **src/utils/strings.json:** This specifies and standardizes different strings that are used throguht the app

# Styles
Modify *src/styles/colors.json* to change the coloring of the app.

# Fonts
There is a file called *react-native.config.js*, which contains the path to the fonts. To add the fonts to both the android and ios apps, run `react-native link`

# Changing the app name
## Android
To change the android app's name, go to the `android/src/main/res/values/strings.xml` and update the `app_name` field.

## IOS
To change the ios app's name, open `ios/app_name/Info.plist` and update the bundle display name field.

# Dependencies
- react navigation (npm i @react-navigation/native)
- react native file system (npm i react-native-fs)
- react navigation stack (npm i @react-navigation/stack)
- react native gesture handler (npm i react-native-gesture-handler)
- react native community async storage (npm i @react-native-community/async-storage)
- typescript (npm i typescript)
- react native modal (npm i react-native-modal)
- react native video (npm i react-native-video)
- react native music control (npm i react-native-music-control)
- react native vector icons (npm i react-native-vector-icons)
- gematriya (npm i gematriya)
- react native safe area context (npm i react-native-safe-area-context)
- react native community masked view (npm i @react-native-community/masked-view)
- react native screens (npm i react-native-screens)
