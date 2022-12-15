import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import PlayerHeader from '../components/PlayerHeader';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} from '../redux/services/shazamCore';
import { Error, RelatedSongs, Sidebar } from '../components';
import { Loader } from '../components';
import { updateFavoriteSongs } from '../services/FavoriteService';
import { useState } from 'react';
import customSnackBar from '../components/customSnackBar';
import { updatePlaylists } from '../services/UserService';
import PlaylistModal from '../components/PlaylistModal';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery({ songid });
  const navigate = useNavigate();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  //--------------- SnackBar consts and functions-----------
  const [openBar, setOpenBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const loggedInToken = window.localStorage.getItem('token');
  const openSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpenBar(true);
  }; //------------------------------------------------------
  const [favoriteSongs, setFavoriteSongs] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).favoriteSongs
      : {}
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

  if (isFetchingRelatedSongs || isFetchingSongDetails)
    return <Loader title="Fetching song details ..." />;
  if (error) return <Error></Error>;

  if (!loggedInToken) {
    alert('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    const updateSongPlaylist = (
      <PlaylistModal
        key={songData.key}
        playlists={playlistsData.playlists}
        song={songData}
        handleAddPlaylist={handleAddPlaylist}
        handleRemovePlaylist={handleRemovePlaylist}
        isAddedPlaylist={playlistsData.playlistSongKeys.includes(
          songData.key.toString()
        )}
      />
    );
    return (
      <div className="flex flex-col rounded-lg">
        {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
        {/* <RiCloseLine
          className="absolute top-5 right-5  font-bold w-6 h-6 text-white cursor-pointer"
          onClick={() => navigate(-1)}
        /> */}
        <PlayerHeader
          artistId=""
          songData={songData}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          isFavorite={songData.key.toString() in favoriteSongs}
          handleFavorite={() => handleFavorite(songData)}
          handleUnfavorite={() => handleUnfavorite(songData)}
          updateSongPlaylist={updateSongPlaylist}
        ></PlayerHeader>
        <div className="w-full h-10"></div>
        <div className="ml-5 mb-5">
          <h2 className="text-2xl font-bold text-[#b7d5f6]"> Lyrics</h2>
          <div className="mt-5">
            {songData?.sections[1].type === 'LYRICS' ? (
              songData?.sections[1].text.map((line, i) => (
                <p className=" text-[#7ebaee] my-1">{line}</p>
              ))
            ) : (
              <p className="text-[#b7d5f6] my-1"> Sorry, no lyrics found.</p>
            )}
          </div>
        </div>
        <RelatedSongs
          favoriteSongs={favoriteSongs}
          data={data}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
        />
      </div>
    );
  }
};

export default SongDetails;
