import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PlayPause from '../components/PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {
  useGetArtistDetailsQuery,
  useGetTopChartsQuery,
} from '../redux/services/shazamCore';
import 'swiper/css';
import 'swiper/css/free-mode';

import { ArtistCard } from '../components';
import { updateFavoriteArtists } from '../services/FavoriteService';
import customSnackBar from '../components/customSnackBar';
import { SignalWifiStatusbarNull } from '@mui/icons-material';

// ------- super hard to get across this conditional usehook problem!!!---------
const GetArtistData = ({ queryArtistId }) => {
  const { data: artistData } = useGetArtistDetailsQuery(queryArtistId);
  const [count, setCount] = useState(1);

  const [favoriteArtists, setFavoriteArtists] = useState(null);
  if (count === 1) {
    setCount(2);
    setFavoriteArtists(
      JSON.parse(window.localStorage.getItem('user')).favoriteArtists
    );
  }
  useEffect(() => {
    if (queryArtistId && artistData) {
      const artistData_ = artistData.data?.[0];
      const newFavoriteArtists = {
        ...favoriteArtists,
        [queryArtistId]: artistData_,
      };
      setFavoriteArtists(newFavoriteArtists);

      updateFavoriteArtists({ artistList: newFavoriteArtists });
    }
  }, [artistData]);
};
// ------- super hard to get across this conditional usehook problem!!!---------
const TopArtists = () => {
  const { data } = useGetTopChartsQuery();
  const loggedInToken = window.localStorage.getItem('token');
  const [queryArtistId, setQueryArtistId] = useState();

  //--------------- SnackBar consts and functions-----------
  const [openBar, setOpenBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const openSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpenBar(true);
  }; //------------------------------------------------------
  const [favoriteArtists, setFavoriteArtists] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).favoriteArtists
      : null
  );

  const handleFavorite = (artistId) => {
    setQueryArtistId(artistId);
    openSnackBar('You favorited a new artist');
  };
  const handleUnfavorite = (artistId) => {
    const { [artistId]: temp, ...newFavoriteArtists } = favoriteArtists;
    setFavoriteArtists((favoriteArtists) => newFavoriteArtists);
    updateFavoriteArtists({ artistList: newFavoriteArtists });
    openSnackBar('You unfavorited an artist');
  };

  if (!loggedInToken) {
    alert('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="w-full flex-col justify-center mb-4">
        {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
        {queryArtistId && <GetArtistData queryArtistId={queryArtistId} />}

        <div className="w-full flex justify-between items-center  mt-4 mb-4">
          <h2 className="font-bold text-3xl text-white text-left">
            Top Artists
          </h2>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-8">
          {data?.map((track) =>
            track.artists ? (
              <ArtistCard
                key={track.key}
                track={track}
                isFavorite={
                  track.artists[0].adamid.toString() in favoriteArtists
                }
                handleFavorite={() => handleFavorite(track.artists[0].adamid)}
                handleUnfavorite={() =>
                  handleUnfavorite(track.artists[0].adamid)
                }
              />
            ) : null
          )}
        </div>
      </div>
    );
  }
};

export default TopArtists;
