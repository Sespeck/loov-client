import { useSelector } from 'react-redux';
import { RiCamera2Fill, RiCloseLine } from 'react-icons/ri';

import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import { TopBarIcon } from '../components/TopBarIcon';
import { IoMdMicrophone } from 'react-icons/io';
import { useState } from 'react';
const Player = ({ closePlayer }) => {
  const { activeSong } = useSelector((state) => state.player);
  const [openLyrics, setOpenLyrics] = useState(false);
  const songid = activeSong?.key;
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  return (
    <div className=" flex flex-col justify-center items-center rounded-lg ">
      <div className="flex justify-center items-center gap-4">
        <div className="w-[130px]" onClick={() => setOpenLyrics(false)}>
          <TopBarIcon icon={<RiCamera2Fill size="25" />} label="Coverart" />
        </div>

        <div
          className="block text-center w-[130px]"
          onClick={() => setOpenLyrics(true)}
        >
          <TopBarIcon icon={<IoMdMicrophone size="25" />} label="Lyrics" />
        </div>
      </div>
      <RiCloseLine
        className="absolute top-5 right-5  font-bold w-6 h-6 text-white cursor-pointer"
        onClick={closePlayer}
      />
      {!openLyrics ? (
        <div className="h-screen overflow-y-scroll hide-scrollbar justify-center items-center mt-5 animate-slideleft pb-20">
          <img
            src={activeSong?.images?.coverarthq}
            alt="background"
            className="rounded-xl mt-5 mx-5 max-h-[400px]"
          />
          <div className="flex-col justify-start mx-5 mt-10">
            <p className="  text-white font-bold text-3xl">
              {activeSong?.title ? activeSong?.title : 'No active Song'}
            </p>
            <p className=" text-gray-300">
              {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
            </p>
          </div>
          <div className="w-full h-[250px]"></div>
        </div>
      ) : (
        <div className="h-screen overflow-y-scroll hide-scrollbar  ml-5 animate-slideright pb-[250px]">
          <div className="mt-5">
            {songData?.sections[1].type === 'LYRICS' ? (
              songData?.sections[1].text.map((line, i) => (
                <p className=" text-[#7ebaee] my-1">{line}</p>
              ))
            ) : (
              <p className="text-[#7ebaee] my-1"> Sorry, no lyrics found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
