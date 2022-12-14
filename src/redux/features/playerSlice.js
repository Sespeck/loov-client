import { createSlice } from '@reduxjs/toolkit';
import { updateRecentlyPlayed } from '../../services/UserService';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;

      const recentlyPlayed = JSON.parse(
        window.localStorage.getItem('user')
      ).recentlyPlayed;

      const keys = recentlyPlayed.map((item, i) => Object.keys(item)[0]);

      const index = keys.indexOf(state.activeSong.key.toString());
      if (index !== -1) {
        recentlyPlayed.splice(index, 1);
      } // remove previous duplicate

      const newRecentlyPlayed = [
        ...recentlyPlayed,
        { [state.activeSong.key]: state.activeSong },
      ].slice(-20); // only the recent 20 songs
      updateRecentlyPlayed({
        recentlyPlayed: newRecentlyPlayed,
      });
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;

      const recentlyPlayed = JSON.parse(
        window.localStorage.getItem('user')
      ).recentlyPlayed;

      const keys = recentlyPlayed.map((item, i) => Object.keys(item)[0]);

      const index = keys.indexOf(state.activeSong.key.toString());
      if (index !== -1) {
        recentlyPlayed.splice(index, 1);
      } // remove previous duplicate

      const newRecentlyPlayed = [
        ...recentlyPlayed,
        { [state.activeSong.key]: state.activeSong },
      ].slice(-20); // only the recent 20 songs
      updateRecentlyPlayed({
        recentlyPlayed: newRecentlyPlayed,
      });
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;

      const recentlyPlayed = JSON.parse(
        window.localStorage.getItem('user')
      ).recentlyPlayed;

      const keys = recentlyPlayed.map((item, i) => Object.keys(item)[0]);

      const index = keys.indexOf(state.activeSong.key.toString());
      if (index !== -1) {
        recentlyPlayed.splice(index, 1);
      } // remove previous duplicate

      const newRecentlyPlayed = [
        ...recentlyPlayed,
        { [state.activeSong.key]: state.activeSong },
      ].slice(-20); // only the recent 20 songs
      updateRecentlyPlayed({
        recentlyPlayed: newRecentlyPlayed,
      });
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
