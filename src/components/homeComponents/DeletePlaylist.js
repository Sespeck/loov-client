import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';

function DeletePlaylist({ playlistId, deletePlaylist }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        <RiDeleteBin6Line
          className="relative flex items-center justify-start
    h-10 w-10   hover:bg-[#3C56B3]
    text-[#a4b8ff] bg-[#283875] p-2 hover:text-white
    hover:rounded-xl rounded-3xl
    transition-all duration-300 ease-linear
    cursor-pointer shadow-lg group"
        />
      </Button>

      <Modal
        className="absolute p-8 inset-0  m-auto shadow-2xl backdrop-blur-lg w-fit h-fit  outline-white rounded-xl outline-double"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-2xl font-bold text-gray-200">
            Are you sure to delete this playlist?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer className="flex justify-between">
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className=" hover:bg-[#325dfa]
             bg-[#3658df] text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              handleClose();
              e.preventDefault();
              deletePlaylist(playlistId);
            }}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePlaylist;
