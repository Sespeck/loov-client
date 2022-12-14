import {
  Error,
  Loader,
  Searchbar,
  Sidebar,
  SongCard,
  TopPlay,
} from '../components';
import { Navigate, useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateFavoriteSongs } from '../services/FavoriteService';
import customSnackBar from '../components/customSnackBar';
import PlaylistModal from '../components/PlaylistModal';
import { updatePlaylists } from '../services/UserService';

const Search = () => {
  const loggedInToken = window.localStorage.getItem('token');
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [favoriteSongs, setFavoriteSongs] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).favoriteSongs
      : null
  );
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

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs = data?.tracks?.hits?.map((song) => song.track);

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

  if (error) return <Error />;

  if (!loggedInToken) {
    console.log('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="flex flex-col">
        {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
        <Searchbar lastSearch={searchTerm} />
        <h2 className="mt-5 font-bold text-3xl text-white text-left">
          Search results for{'  '}
          <span className="font-bold italic">{searchTerm}</span>
        </h2>
        <div className="mt-5 w-full flex justify-between items-center mb-10">
          {isFetching ? (
            <Loader title="Loading results ..." />
          ) : (
            <div className="w-full flex flex-wrap justify-center gap-8">
              {songs.map((song, i) => {
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
                  <SongCard
                    key={song.key}
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    isFavorite={song.key.toString() in favoriteSongs}
                    handleFavorite={() => handleFavorite(song)}
                    handleUnfavorite={() => handleUnfavorite(song)}
                    updateSongPlaylist={updateSongPlaylist}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Search;
