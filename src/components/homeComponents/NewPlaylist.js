import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function NewPlaylist({ addNewPlaylist }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  };
  const _handleReaderLoaded = (e) => {
    let binaryString = e.target.result;
    setImage(btoa(binaryString));
  };
  return (
    <>
      <button onClick={handleShow}>
        <AiOutlinePlusCircle
          className="ml-3 relative flex items-center justify-start
        h-12 w-12   hover:bg-[#3C56B3] p-2
        text-[#96b4ffdd] hover:text-white
        hover:rounded-xl rounded-3xl
        transition-all duration-300 ease-linear
        cursor-pointer shadow-lg group"
        />
      </button>

      <Modal
        className="absolute p-8 inset-0  m-auto shadow-2xl backdrop-blur-lg w-fit h-fit  outline-white rounded-xl outline-double"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-2xl font-bold text-gray-200">
            New Playlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleClose();
              e.preventDefault();

              addNewPlaylist(image, name);
            }}
            id="editmodal"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Playlist name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6"></div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="image"
                >
                  Icon
                </label>
              </div>
              <div className="md:w-2/3">
                <label htmlFor="profilePhoto">
                  <input
                    accept="image/*"
                    id="profilePhoto"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                  />
                  <Avatar
                    src={`data:image;base64,${image}`}
                    sx={{ width: 75, height: 75, cursor: 'pointer' }}
                  />
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className=" hover:bg-[#325dfa]
             bg-[#3658df] text-white font-bold py-2 px-4 rounded"
            form="editmodal"
          >
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewPlaylist;
