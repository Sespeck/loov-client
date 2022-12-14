import { ariaHidden } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { updateFavoriteArtists } from '../../services/FavoriteService';
import customSnackBar from '../customSnackBar';

import FavoriteArtistCard from '../FavoriteArtistCard';

const Artists = () => {
  const loggedInToken = window.localStorage.getItem('token');

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
  const initialArtists = Object.values(
    JSON.parse(window.localStorage.getItem('user')).favoriteArtists
  );

  const handleUnfavorite = (artistId) => {
    const { [artistId]: temp, ...newFavoriteArtists } = favoriteArtists;
    setFavoriteArtists((favoriteArtists) => newFavoriteArtists);
    updateFavoriteArtists({ artistList: newFavoriteArtists });
    openSnackBar('You unfavorited an artist');
  };

  if (!loggedInToken) {
    console.log('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    console.log(favoriteArtists);
    return (
      <div className="w-full flex-col justify-center mb-4  animate-slideleft">
        {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
        <div className="w-full flex justify-between items-center  mt-4 mb-4">
          <h2 className="font-bold text-3xl text-white text-left">
            Your Favorite Artists
          </h2>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-8">
          {initialArtists.map((artistData, i) => {
            return (
              <FavoriteArtistCard
                artistId={artistData.id}
                i={i}
                key={artistData.id}
                artistData={artistData}
                isFavorite={artistData.id in favoriteArtists}
                handleFavorite={() => {}}
                handleUnfavorite={() => handleUnfavorite(artistData.id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default Artists;
