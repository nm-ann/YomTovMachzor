# Hebrew and English Text Files
Text files should be to show both phrase breaks and paragraph breaks. Phrase breaks are represented as a new line (the character \n), which paragraph breaks are represented by two new lines (\n\n).

Example:
```
בראשית ברא אלוקים
:את השמים ואת הארץ


והארץ הייתה תהו ובהו
וחשך על פני תהום
:ורוח אלוקים מרחפת על פני המים
```

# File Naming
files should be named in format `[section]_[type]_[number].[extension]`. For example, the first hebrew mincha text file should be named `mincha_hebrew_1.txt`. A split file's type should be its nusach. For example, the first ashkenazis mincha file should be name `mincha_ashk_1.txt`.

The type of app does not play a role in the naming conventions. The first mincha text file for a shabbos app should be named _exactly_ the same as the first mincha text file for a yom tov app. Only the most immediate category (ie type of tefillah, sefer of the torah, etc.) should be used in naming.

# Folder Layout
Resource folders should have a completely flat layout. All audio and text files should be in the same folder.

# Main Menu Configuration
The app's main menu lists various sections, along with the playlist and settings sections. It is defined in a file called mainMenu.json. The following is an example of its format, taken from the Yom Tov Machzor App:

```
[
    {
        "title": "maariv",
        "iconName": "candle",
        "nextScreen": "Chapter"
    },
    {
        "title": "shach",
        "iconName": "weather-sunset-up",
        "nextScreen": "TitleMenu"
    },
    {
        "title": "musaf",
        "iconName": "campfire",
        "nextScreen": "TitleMenu"
    },
    {
        "title": "mincha",
        "iconName": "weather-sunset-down",
        "nextScreen": "TitleMenu"
    },
    {
        "title": "playlist",
        "iconName": "playlist-music",
        "nextScreen": "SectionMenu"
    },
    {
        "title": "settings",
        "iconName": "cog",
        "nextScreen": "SettingsMenu"
    }
]
```

Each menu item (which will become a button on the home screen) is comprised of 3 items: a title, an icon name, and next screen. 

- The title should be in lowercase and will represent the title that eventually appears on the bottom. The developer will modify a different file to allow the title to appear properly, in an uppercase format.

- The icon name should be left blank (ie. iconName: "",) and will be modified by the developer.

- The next screen tells the app which screen to show when a user clicks on the button. There are 3 options for the next screen: ChapterMenu, TitleMenu, and SectionMenu. 
  - ChapterMenu should be used when the next screen should be a list of chapters, each represented as a number. For example, Tehillim uses a ChapterMenu to display the 150 different chapters.
  - TitleMenu should be used when the next screen is a list of titles, not just numbers. For example, the Mincha screen may contain the Ashrei, Shemoneh Esrei, and Aleinu, so it should use a title menu.
  - SectionMenu should be used when the next screen is a secondary menu. For example, in the Tehillim app, the next screen for Books is a SectionMenu because it will show a list of books, which in turn show a list of chapters. Because the buttons in the Book screen take the user to another menu, instead of a screen with text, a SectionMenu is used.

  # Chapter Configuration
The apps's chapter configuration is stored in a file called menu.json and has the following format (example is from the Yom Tov Machzor App):
  ```
  {
    "maariv": {
        "title": "Maariv",
        "firstChapter": 0,
        "chapters": [
            {
                "collection": "maariv",
                "title": "Maariv",
                "chapterNum": 1
            }
        ]
    },
    "musaf": {
        "title": "Mussaf",
        "chapters": [
            {
                "collection": "musaf",
                "title": "Ashrei",
                "chapterNum": 1
            },
            {
                "collection": "musaf",
                "title": "Avot",
                "chapterNum": 2
            },
            {
                "collection": "musaf",
                "title": "Kedushat Hayom",
                "chapterNum": 3
            },
            {
                "collection": "musaf",
                "title": "Hodaah",
                "chapterNum": 4
            }
        ]
    }
  }
  ```
  The basic format is as follows:
  ```
  { // opening and closing braces for the file
    "name_of_section": { // opening and closing braces for the section
        "title": "Title_to_be_displayed_on_screen",
        "chapters": [ // opening and closes brackets for the list of chapters
            { // opening and closing braces for the individual chapter
                "collection": "name_of_collection", // The name of the collection is the file's prefix.
                // for exmaple, the collection of mincha_hebrew_1.txt is mincha
                "title": "The_title_to_be_displayed_on_screen",
                "chapterNum": "The_number_of_this_chapter"
            }
        ]

    }
  }
  ```
