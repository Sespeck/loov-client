import { ArrowForward } from '@mui/icons-material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { TbClick } from 'react-icons/tb';

import AddPlaylist from './AddPlaylist';

import { IoMdClose } from 'react-icons/io';
import {
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from 'react-icons/md';

const PlaylistCard = ({
  playlist,
  song,
  handleAddPlaylist,
  handleRemovePlaylist,
}) => {
  return (
    <div className="w-full flex flex-row items-center  py-2  rounded-lg  mb-2">
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-10 h-10 rounded-lg"
          src={`data:image;base64,${playlist.image}`}
          alt={'playlist '}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="font-bold text-md text-white">{playlist.name} </p>

          <p className="font-bold text-sm text-gray-300 mt-1">
            {Object.keys(playlist.songData).length} songs
          </p>
        </div>
        <AddPlaylist
          isAdded={song.key in playlist.songData}
          handleAddPlaylist={handleAddPlaylist}
          handleRemovePlaylist={handleRemovePlaylist}
        />
      </div>
    </div>
  );
};

function PlaylistModal({
  song,
  playlists,
  handleAddPlaylist,
  handleRemovePlaylist,
  isAddedPlaylist,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        <>
          {isAddedPlaylist && (
            <MdOutlinePlaylistAddCheck
              size={32}
              className="text-gray-300 cursor-pointer"
            />
          )}
          {!isAddedPlaylist && (
            <MdOutlinePlaylistAdd
              size={32}
              className="text-gray-300 cursor-pointer"
            />
          )}
        </>
      </Button>

      <Modal
        className="transition ease-in-out duration-200 absolute min-w-[400px]  p-8 inset-0  m-auto shadow-2xl backdrop-blur-lg w-fit h-fit  outline-white rounded-xl outline-double bg-black/50"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="max-w-[400px] flex text-2xl font-bold text-gray-200">
            <p className="flex-1 block  max-w-full italic truncate">
              {song.title}
            </p>{' '}
            <IoMdClose
              size="30px"
              className="ml-2 text-gray-300 cursor-pointer"
              onClick={handleClose}
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="animate-slideleft">
          {Object.keys(playlists).length !== 0 ? (
            Object.values(playlists).map((playlist, i) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                song={song}
                handleAddPlaylist={() => handleAddPlaylist(song, playlist)}
                handleRemovePlaylist={() =>
                  handleRemovePlaylist(song, playlist)
                }
              />
            ))
          ) : (
            <Link className="flex" to={'/yours/playlists'}>
              <TbClick className="text-xl text-gray-200 mr-3" />
              <span className="font-bold text-md text-gray-200 mb-5 underline">
                Create a new playlist
              </span>
            </Link>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlaylistModal;
