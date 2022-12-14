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
import { TopBarIcon } from './TopBarIcon';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';

function About() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className=" absolute w-6 h-6 text-gray-500 top-8 right-10 hover:text-white hover:cursor-pointer"
        onClick={handleShow}
      >
        <BsInfoCircle size={25} />
      </Button>

      <Modal
        className="transition ease-in-out duration-100 absolute w-[90%] p-8 inset-0 m-auto shadow-2xl backdrop-blur-lg overflow-y-scroll hide-scrollbar h-[70%] mt-20 outline-white rounded-xl outline-double bg-black/50"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="w-full flex-col justify-center animate-slideleft">
          <div className="w-full flex mb-4 ">
            <div className="flex-1 ">
              <p
                className=" italic truncate text-center text-2xl font-bold text-gray-200
               "
              >
                Loov: Cloud Music Library
              </p>
            </div>
            <IoMdClose
              size="30px"
              className="ml-2 text-gray-300 cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="w-full flex-col justify-center mb-4   text-white ">
            Loov will collect your favorite songs, artist and playlists
            conveniently at just one click. Discover trendy music, artists,
            lyrics, & playlists, all for free. Music discovering services are
            empowered by Shazam and Apple music.
            <br />
            <br />
            WHY YOU’LL LOVE IT
            <br />
            Find the name of any song or artist in seconds. Play the demo and
            add to your favorite collection and playlists at one click. Follow
            along with song lyrics, enjoy related music and top songs of an
            artist at detail pages. Expand player bar, switch between coverart
            and lyrics of the actively playing song. <br />
            <br />
            LOOV ANYWHERE, AT ANY TIME
            <br />
            Get it ready on a desktop browser, Android Chrome or iPhone Safari.
            Interactive and responsive app design in nature. Smooth transition
            and accomodation to various window sizes. One login enables you to
            access your favorite collections right away wherever you are.
            <br />
            <br /> By Sean Zhenyu Wang
            <br /> Dec 10 2022
          </div>
        </div>
      </Modal>
    </>
  );
}

export default About;
