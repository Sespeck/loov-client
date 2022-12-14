import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import PlayerHeader from '../components/PlayerHeader';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { RelatedSongs, Error, Sidebar } from '../components';
import { Loader } from '../components';
import ArtistSongs from '../components/ArtistSongs';
import { updateFavoriteArtists } from '../services/FavoriteService';
import { useState } from 'react';
import customSnackBar from '../components/customSnackBar';
import SongDetails from './SongDetails';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const navigate = useNavigate();
  //--------------- SnackBar consts and functions-----------
  const [openBar, setOpenBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const openSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpenBar(true);
  }; //------------------------------------------------------
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const loggedInToken = window.localStorage.getItem('token');
  const [favoriteArtists, setFavoriteArtists] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).favoriteArtists
      : {}
  );
  const handleFavorite = (artistId, artistData_) => {
    const newFavoriteArtists = { ...favoriteArtists, [artistId]: artistData_ };
    setFavoriteArtists((favoriteArtists) => newFavoriteArtists);
    updateFavoriteArtists({ artistList: newFavoriteArtists });
    openSnackBar('You favorited a new artist');
  };
  const handleUnfavorite = (artistId, artistData_) => {
    const { [artistId]: temp, ...newFavoriteArtists } = favoriteArtists;
    setFavoriteArtists((favoriteArtists) => newFavoriteArtists);
    updateFavoriteArtists({ artistList: newFavoriteArtists });
    openSnackBar('You unfavorited an artist');
  };
  if (isFetchingArtistDetails)
    return <Loader title="Fetching artist details ..." />;
  if (error) return <Error />;

  if (!loggedInToken) {
    alert('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    const artistData_ = artistData.data?.[0];
    return (
      <div className="flex flex-col rounded-lg">
        {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
        {/* <RiCloseLine
          className="absolute top-5 right-5  font-bold w-6 h-6 text-white cursor-pointer"
          onClick={() => navigate(-1)}
        /> */}
        <PlayerHeader
          artistId={artistId}
          artistData={artistData_}
          isFavorite={artistId.toString() in favoriteArtists}
          handleFavorite={() => handleFavorite(artistId, artistData_)}
          handleUnfavorite={() => handleUnfavorite(artistId, artistData_)}
        ></PlayerHeader>
        <div className="w-full h-10"></div>
        <ArtistSongs
          data={Object.values(artistData_?.views?.['top-songs']?.data)}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </div>
    );
  }
};

export default ArtistDetails;
