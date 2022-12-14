import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { editUser } from '../services/UserService';

function EditUser({ user, setUsers }) {
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [type, setType] = useState(user.userType);
  const [avatarFile, setAvatarFile] = useState(user.avatarFile);
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
    setAvatarFile(btoa(binaryString));
  };

  return (
    <>
      <div
        className=" 
        w-10 h-10 p-2.5 bg-[#2c7bea]  hover:bg-[#3672cd]  
        hover:rounded-xl rounded-3xl
        transition-all duration-300 ease-linear
        cursor-pointer shadow-xl group mr-2"
        onClick={handleShow}
      >
        <FiEdit className=" text-white w-full h-full   hover:grayscale-2" />
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
            Update User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleClose();
              e.preventDefault();
              editUser({
                userId: user._id,
                fname,
                lname,
                avatarFile,
                userType: type,
              }).then((res) => {
                console.log(res);
                setUsers(res.users);
              });
            }}
            id="editmodal"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="fname"
                >
                  First name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="lname"
                >
                  Last name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="user type"
                >
                  User type
                </label>
              </div>

              <div className="flex">
                <div className="flex items-center mr-4">
                  <input
                    id="inline-radio"
                    type="radio"
                    value="User"
                    name="inline-radio-group"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setType(e.target.value)}
                    defaultChecked={type === 'User'}
                  />
                  <label
                    htmlFor="inline-radio"
                    className="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                  >
                    User
                  </label>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    id="inline-2-radio"
                    type="radio"
                    value="Administrator"
                    name="inline-radio-group"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    defaultChecked={type === 'Administrator'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <label
                    htmlFor="inline-2-radio"
                    className="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                  >
                    Administrator
                  </label>
                </div>
              </div>
              {/* 
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={type}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </div> */}
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="image"
                >
                  Avatar
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
                    src={`data:image;base64,${avatarFile}`}
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
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
