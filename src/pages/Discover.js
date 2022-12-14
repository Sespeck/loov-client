import { Error, Loader, Searchbar, SongCard, TopPlay } from '../components';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { updateFavoriteSongs } from '../services/FavoriteService';
import customSnackBar from '../components/customSnackBar';
import LoginButton from '../components/LoginButton';
import { updatePlaylists } from '../services/UserService';
import PlaylistModal from '../components/PlaylistModal';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'POP'
  );
  const loggedInToken = window.localStorage.getItem('token');
  const [favoriteSongs, setFavoriteSongs] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).favoriteSongs
      : {}
  );
  const [openBar, setOpenBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const openSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpenBar(true);
  };

  const handleFavorite = (song) => {
    const newFavoriteSongs = { ...favoriteSongs, [song.key]: song };
    setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
    updateFavoriteSongs({ songList: newFavoriteSongs });
    openSnackBar('You favorited a new song');
  };
  const handleUnFavorite = (song) => {
    const { [song.key]: temp, ...newFavoriteSongs } = favoriteSongs;
    setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
    updateFavoriteSongs({ songList: newFavoriteSongs });
    openSnackBar('You unfavorited a song');
  };

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

  // if (isFetching) return <Loader title="Loading songs ..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      {!loggedInToken && <LoginButton />}
      {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
      <TopPlay />
      <div className="w-full flex justify-between items-center  mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover by Genres
        </h2>

        <select
          id="genre"
          onChange={(e) => {
            e.preventDefault();
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'Pop'}
          className=" bg-[#296bbd] text-gray-300 p-3 text-sm rounded-lg
          outline-none sm:mt-0"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      {isFetching ? (
        <Loader title="Loading songs ..." />
      ) : (
        <div className="w-full flex flex-wrap justify-center gap-8">
          {data?.map((song, i) => {
            if (song.artists) {
              if (loggedInToken) {
                const isFavorite = song.key.toString() in favoriteSongs;
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
                    isFavorite={isFavorite}
                    handleFavorite={() => handleFavorite(song)}
                    handleUnfavorite={() => handleUnFavorite(song)}
                    updateSongPlaylist={updateSongPlaylist}
                  />
                );
              } else
                return (
                  <SongCard
                    key={song.key}
                    song={song}
                    i={i}
                    data={data}
                    isFavorite={false}
                    handleFavorite={() => {
                      openSnackBar('Please log in for favorite services');
                    }}
                    handleUnfavorite={() => {
                      openSnackBar('Please log in for favorite services');
                    }}
                    handleAddPlaylist={() => {
                      openSnackBar('Please log in for playlist services');
                    }}
                  />
                );
            } else return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Discover;
