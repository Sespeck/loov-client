import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Link } from 'react-router-dom';

import EditPlaylist from './EditPlaylist';
import { updatePlaylists } from '../../services/UserService';
import NewPlaylist from './NewPlaylist';
import DeletePlaylist from './DeletePlaylist';
import PlaylistWindow from './PlaylistWindow';

const PlaylistCard = ({ playlist, i, editPlaylist, deletePlaylistButton }) => {
  const [showPlaylistWindow, setShowPlaylistWindow] = useState(false);
  const handleClose = () => setShowPlaylistWindow(false);
  const handleShow = () => setShowPlaylistWindow(true);
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#345596] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <div className="flex-1 flex flex-row justify-between items-center">
        <div
          className="flex-1 flex "
          onClick={() => {
            handleShow();
          }}
        >
          <img
            className="w-20 h-20 rounded-lg"
            src={`data:image;base64,${playlist.image}`}
            alt={'playlist '}
          />
          <div className="flex-1 flex flex-col justify-center mx-3">
            <p className="text-xl font-bold text-white">{playlist.name} </p>

            <p className="text-base font-bold text-gray-500 mt-1">
              {Object.keys(playlist.songData).length} songs
            </p>
          </div>
        </div>
        {editPlaylist}
        <div className="w-[8px]" />
        {deletePlaylistButton}
        <PlaylistWindow
          playlist={playlist}
          show={showPlaylistWindow}
          handleshow={handleShow}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

const PlayLists = () => {
  const loggedInToken = window.localStorage.getItem('token');

  const [playlists, setPlaylists] = useState(
    loggedInToken
      ? JSON.parse(window.localStorage.getItem('user')).playlists
      : null
  );

  function updatePlaylist(id, newImage, newName) {
    const { [id]: temp, ...restPlaylists } = playlists;
    const updatedPlaylists = {
      ...restPlaylists,
      [id]: {
        ...temp,
        image: newImage,
        name: newName,
      },
    };
    setPlaylists(updatedPlaylists);
    updatePlaylists({ playlists: updatedPlaylists });
  }

  function deletePlaylist(playlistId) {
    const { [playlistId]: temp, ...updatedPlaylists } = playlists;
    setPlaylists(updatedPlaylists);
    updatePlaylists({ playlists: updatedPlaylists });
  }

  function addNewPlaylist(newImage, newName) {
    const newPlaylist = {
      id: uuidv4(),
      image: newImage,
      name: newName,
      songData: {},
    };
    const updatedPlaylists = { ...playlists, [newPlaylist.id]: newPlaylist };
    setPlaylists(updatedPlaylists);
    updatePlaylists({ playlists: updatedPlaylists });
  }
  return (
    <div className="w-full flex-col justify-center mb-4  animate-slideleft">
      <div className="w-full flex justify-between items-center  mt-4 mb-4">
        <h2 className="flex items-center font-bold text-3xl text-white text-left">
          Your Playlists
          <NewPlaylist addNewPlaylist={addNewPlaylist} />
        </h2>
      </div>
      <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-2 gap-1">
        {Object.values(playlists).map((playlist, i) => {
          const editPlaylist = (
            <EditPlaylist playlist={playlist} updatePlaylist={updatePlaylist} />
          );
          const deletePlaylistButton = (
            <DeletePlaylist
              playlistId={playlist.id}
              deletePlaylist={deletePlaylist}
            />
          );

          return (
            <PlaylistCard
              playlist={playlist}
              id={playlist.id}
              key={playlist.id}
              editPlaylist={editPlaylist}
              deletePlaylistButton={deletePlaylistButton}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayLists;
