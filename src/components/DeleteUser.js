import { Avatar } from '@mui/material';
import { setUseProxies } from 'immer';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiTrash2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteUser } from '../services/UserService';

function DeleteUser({ user, setUsers }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        className="  
        w-10 h-10 p-2.5 bg-[#f93b3b]  hover:bg-[#cd3636] 
        hover:rounded-xl rounded-3xl
        transition-all duration-300 ease-linear
        cursor-pointer shadow-xl group"
        onClick={handleShow}
      >
        <FiTrash2 className=" text-white w-full h-full   hover:grayscale-2" />
      </div>

      <Modal
        className="absolute p-8 inset-0  m-auto shadow-2xl backdrop-blur-lg w-fit h-fit  outline-white rounded-xl outline-double"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-2xl font-bold text-gray-200">
            Are you sure to delete this user?
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
              deleteUser({ userId: user._id }).then((res) => {
                console.log(res);
                setUsers(res.users);
              });
            }}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
