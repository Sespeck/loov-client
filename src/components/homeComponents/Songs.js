import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import { updateFavoriteSongs } from '../../services/FavoriteService';
import { updatePlaylists } from '../../services/UserService';
import customSnackBar from '../customSnackBar';
import PlaylistModal from '../PlaylistModal';
import TopChartCard from '../TopChartCard';

const Songs = () => {
  const loggedInToken = window.localStorage.getItem('token');
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [favoriteSongs, setFavoriteSongs] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).favoriteSongs
      : null
  );
  const initialSongs = Object.values(
    JSON.parse(window.localStorage.getItem('user')).favoriteSongs
  );

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: Object.values(favoriteSongs), i }));
    dispatch(playPause(true));
  };

  const handleFavorite = (song) => {
    const newFavoriteSongs = { ...favoriteSongs, [song.key]: song };
    setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
    updateFavoriteSongs({ songList: newFavoriteSongs });
    openSnackBar('You favorited a new song');
  };
  const handleUnfavorite = (song) => {
    const { [song.key]: temp, ...newFavoriteSongs } = favoriteSongs;
    setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
    updateFavoriteSongs({ songList: newFavoriteSongs });
    openSnackBar('You unfavorited a song');
  };

  //--------------- SnackBar consts and functions-----------
  const [openBar, setOpenBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const openSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpenBar(true);
  }; //------------------------------------------------------
  //--------------------- Playlist ---------------------
  const [playlistsData, setPlaylistsData] = useState(() => {
    if (loggedInToken) {
      const data = JSON.parse(window.localStorage.getItem('user')).playlists;
      const playlistSongKeys = [];
      Object.values(data).map((playlist, i) =>
        playlistSongKeys.push(...Object.keys(playlist?.songData))
      );

      return {
        playlists: data,
        playlistSongKeys: playlistSongKeys,
      };
    } else return { playlists: null, playlistSongKeys: null };
  });

  const handleAddPlaylist = (song, playlist) => {
    const updatedPlaylistSongData = { ...playlist.songData, [song.key]: song };
    playlist.songData = updatedPlaylistSongData;
    const { [playlist.id]: temp, ...restPlaylists } = playlistsData.playlists;
    const newPlaylists = { ...restPlaylists, [playlist.id]: playlist };
    const updatedPlaylistSongKeys = [];
    Object.values(newPlaylists).map((p) =>
      updatedPlaylistSongKeys.push(...Object.keys(p?.songData))
    );

    setPlaylistsData({
      playlists: newPlaylists,
      playlistSongKeys: updatedPlaylistSongKeys,
    });
    updatePlaylists({ playlists: newPlaylists });
    openSnackBar(`${song.title} is ADDED to ${playlist.name}`);
  };
  const handleRemovePlaylist = (song, playlist) => {
    const { [song.key]: temp, ...restSongs } = playlist.songData;
    playlist.songData = restSongs;
    const { [playlist.id]: t, ...restPlaylists } = playlistsData.playlists;
    const newPlaylists = { ...restPlaylists, [playlist.id]: playlist };

    const updatedPlaylistSongKeys = [];
    Object.values(newPlaylists).map((p) =>
      updatedPlaylistSongKeys.push(...Object.keys(p?.songData))
    );

    setPlaylistsData({
      playlists: newPlaylists,
      playlistSongKeys: updatedPlaylistSongKeys,
    });
    updatePlaylists({ playlists: newPlaylists });
    openSnackBar(`${song.title} is REMOVED from ${playlist.name}`);
  };

  return (
    <div className="w-full flex-col justify-center mb-4  animate-slideleft">
      {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
      <div className="w-full flex justify-between items-center  mt-4 mb-4">
        <h2 className="font-bold text-3xl text-white text-left">
          Your Favorite Songs
        </h2>
      </div>
      <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-2 gap-1">
        {initialSongs?.map((song, i) => {
          if (song.artists) {
            const updateSongPlaylist = (
              <PlaylistModal
                key={song.key}
                playlists={playlistsData.playlists}
                song={song}
                handleAddPlaylist={handleAddPlaylist}
                handleRemovePlaylist={handleRemovePlaylist}
                isAddedPlaylist={playlistsData.playlistSongKeys.includes(
                  song.key.toString()
                )}
              />
            );

            return (
              <TopChartCard
                song={song}
                i={i}
                key={song.key}
                isPlaying={isPlaying}
                isFavorite={song.key.toString() in favoriteSongs}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                handleFavorite={() => handleFavorite(song)}
                handleUnfavorite={() => handleUnfavorite(song)}
                updateSongPlaylist={updateSongPlaylist}
              />
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default Songs;
