import AsyncStorage from '@react-native-community/async-storage';

export async function getAllPlaylists() {
  let playlists;
  try {
    const result = await AsyncStorage.getItem('playlists');
    if (result === null) {
      playlists = [];
    } else {
      playlists = JSON.parse(result);
    }
  } catch (err) {
    console.log(err);
    playlists = [];
  }

  return playlists;
}

export async function addItemToPlaylist(playlistTitle, item) {
  const playlists = await getAllPlaylists();
  const index = playlists.findIndex((e) => e.title === playlistTitle);
  if (index >= 0) {
    playlists[index].chapters.push(item);
  } else {
    playlists.push({
      title: playlistTitle,
      chapters: [item],
    });
  }

  AsyncStorage.setItem('playlists', JSON.stringify(playlists));
}

export async function removeItemFromPlaylist(playlistTitle, item) {
  const playlists = await getAllPlaylists();
  const playlistIndex = playlists.findIndex((e) => e.title === playlistTitle);
  if (playlistIndex >= 0) {
    const itemIndex = playlists[playlistIndex].chapters.indexOf(item);
    playlists[playlistIndex].chapters.splice(itemIndex, 1);
  }
  AsyncStorage.setItem('playlists', JSON.stringify(playlists));
}

export async function itemIsInPlaylist(playlistTitle, item) {
  const playlists = await getAllPlaylists();
  console.log(playlists);
  const playlistIndex = playlists.findIndex((e) => e.title === playlistTitle);
  if (playlistIndex === -1) {
    return false;
  }
  return playlists[playlistIndex].chapters.includes(item);
}

export async function removePlaylist(playlistTitle) {
  const playlists = await getAllPlaylists();
  const playlistIndex = playlists.findIndex((e) => e.title === playlistTitle);
  playlists.splice(playlistIndex, 1);
  AsyncStorage.setItem('playlists', JSON.stringify(playlists));
}
