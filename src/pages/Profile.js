import React, { useState } from 'react';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import PlayLists from '../components/homeComponents/PlayLists';

import { edit, favourite, logo, music, playlist, singer } from '../assets';

import ProfileUpdateModal from '../components/ProfileUpdateModal';
import { ArrowForward } from '@mui/icons-material';
import { FiEdit } from 'react-icons/fi';

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const raw = JSON.parse(window.localStorage.getItem('user'));
    if (raw) {
      return {
        fname: raw.fname,
        lname: raw.lname,
        avatarFile: raw.avatarFile,
        email: raw.email,
      };
    }
    return null;
  });
  const favoriteSongsCount = Object.keys(
    JSON.parse(window.localStorage.getItem('user')).favoriteSongs
  ).length;
  const favoriteArtistsCount = Object.keys(
    JSON.parse(window.localStorage.getItem('user')).favoriteArtists
  ).length;
  const playlistsCount = Object.keys(
    JSON.parse(window.localStorage.getItem('user')).playlists
  ).length;

  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);
  const loggedInToken = window.localStorage.getItem('token');
  if (!loggedInToken) {
    console.log('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  }

  const CapFirst = (s) => {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  };

  const handleClose = () => setShowProfileUpdateModal(false);
  const handleShow = () => setShowProfileUpdateModal(true);
  return (
    <div className="flex justify-center  pb-20  relative w-full  hide-scrollbar  animate-slideleft gap-8">
      <ProfileUpdateModal
        show={showProfileUpdateModal}
        handleClose={handleClose}
        profile={profile}
        setProfile={setProfile}
      />

      <div className="flex flex-col  ml-[5%]">
        <span className="mt-5 font-bold text-3xl text-white ">
          Hi, {CapFirst(profile.fname)} {CapFirst(profile.lname)}!
        </span>
        <h2 className=" mt-1 font-bold text-sm text-gray-500 mb-5">
          {profile.email}
        </h2>
        <img
          className="w-full max-w-sm aspect-square rounded-full object-cover"
          alt="Avatar"
          src={`data:image;base64,${profile.avatarFile}`}
        />
        <div
          className=" relative flex  items-center mt-5 mb-[220px]
        w-10 h-10 p-2.5 bg-[#3477dd50]  hover:bg-[#3672cd]
        text-[#537bb7] hover:text-[#4897ff]
        hover:rounded-xl rounded-3xl
        transition-all duration-300 ease-linear
        cursor-pointer shadow-xl group"
          onClick={handleShow}
        >
          {/* <img
            title="Click to update your profile"
            className=" w-full h-full grayscale-[40%] cursor-pointer hover:grayscale-2"
            alt="edit"
            src={edit}
          /> */}
          <FiEdit className=" text-gray-300 w-full h-full  cursor-pointer hover:grayscale-2" />
          <span
            className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
        text-white bg-[#49adef]
        text-xs font-bold
        transition-all duration-100 scale-0 origin-left group-hover:scale-100"
          >
            Click to update your profile
          </span>
        </div>
      </div>

      <div className=" flex w-full flex-col  items-center  ">
        <div className="flex-col w-full max-w-[500px] justify-start mx-5 mt-5">
          <div className="w-full flex flex-row items-center bg-[#345596b7] px-8 py-5  rounded-lg  mb-2">
            <div className="flex-1 flex flex-row justify-between items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={music}
                alt={'favorite songs icon'}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">Favorite Songs</p>

                <p className="text-base text-gray-400 mt-1">
                  {favoriteSongsCount} songs
                </p>
              </div>
            </div>
            <Link to="/yours/songs">
              <ArrowForward className="text-white font-bold cursor-pointer" />
            </Link>
          </div>

          <div className="w-full flex flex-row items-center bg-[#345596b7] px-8 py-5  rounded-lg  mb-2">
            <div className="flex-1 flex flex-row justify-between items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={singer}
                alt={'favorite artists icon'}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">Favorite Artists</p>

                <p className="text-base text-gray-400 mt-1">
                  {favoriteArtistsCount} artists
                </p>
              </div>
            </div>

            <Link to="/yours/artists">
              {' '}
              <ArrowForward className="text-white font-bold cursor-pointer" />
            </Link>
          </div>
          <div className="w-full flex flex-row items-center bg-[#345596b7] px-8 py-5  rounded-lg  mb-2">
            <div className="flex-1 flex flex-row justify-between items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={playlist}
                alt={'playlists icon'}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">Playlists</p>

                <p className="text-base text-gray-400 mt-1">
                  {playlistsCount} playlists
                </p>
              </div>
            </div>

            <Link to="/yours/playlists">
              {' '}
              <ArrowForward className="text-white font-bold cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
