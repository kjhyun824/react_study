const songsReducers = () => {
  return [
    { title: 'The Call', duration: '4:05' },
    { title: 'Macarena', duration: '2:30' },
    { title: 'All Start', duration: '3:25' },
    { title: 'Halo', duration: '5:18' },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload;
  }
  return selectedSong;
};
