import React, { useState } from 'react';
import {
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from 'react-icons/md';

const AddPlaylist = ({ isAdded, handleAddPlaylist, handleRemovePlaylist }) => {
  const [added, setAdded] = useState(isAdded);

  return (
    <>
      {added && (
        <MdOutlinePlaylistAddCheck
          size={32}
          className="text-gray-300 cursor-pointer"
          onClick={() => {
            handleRemovePlaylist();
            setAdded(!added);
          }}
        />
      )}
      {!added && (
        <MdOutlinePlaylistAdd
          size={32}
          className="text-gray-300 cursor-pointer"
          onClick={() => {
            handleAddPlaylist();
            setAdded(!added);
          }}
        />
      )}
    </>
  );
};

export default AddPlaylist;
