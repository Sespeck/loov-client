import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';
import { TbClick } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import { updateFavoriteSongs } from '../../services/FavoriteService';
import customSnackBar from '../customSnackBar';
import TopChartCard from '../TopChartCard';

function PlaylistWindow({ playlist, show, handleshow, handleClose }) {
  const songData = Object.values(playlist.songData);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: Object.values(songData), i }));
    dispatch(playPause(true));
  };
  const [favoriteSongs, setFavoriteSongs] = useState(
    JSON.parse(window.localStorage.getItem('user')).favoriteSongs
  );

  const handleFavorite = (song) => {
    const newFavoriteSongs = { ...favoriteSongs, [song.key]: song };
    setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
    updateFavoriteSongs({ songList: newFavoriteSongs });
    openSnackBar('You favorited a new song');
  };
  const handleUnfavorite = (song) => {
    const { [song.key]: temp, ...newFavoriteSongs } = favoriteSongs;
    setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
    updateFavoriteSongs({ songList: newFavoriteSongs });
    openSnackBar('You unfavorited a song');
  };

  //--------------- SnackBar consts and functions-----------
  const [openBar, setOpenBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const openSnackBar = (message) => {
    setSnackBarMessage(message);
    setOpenBar(true);
  }; //------------------------------------------------------

  return (
    <>
      {customSnackBar({ openBar, setOpenBar, snackBarMessage })}
      <Modal
        className="transition ease-in-out duration-100 absolute w-[90%] p-8 inset-0 m-auto shadow-2xl backdrop-blur-lg overflow-y-scroll hide-scrollbar h-[70%] mt-20 outline-white rounded-xl outline-double bg-black/50"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="w-full flex-col justify-center mb-4  animate-slideleft">
          <div className=" flex justify-between  ml-4 text-3xl font-bold text-[#67abff]">
            <img
              className="w-20 h-20 rounded-lg"
              src={`data:image;base64,${playlist.image}`}
              alt={'playlist '}
            />
            <div className=" flex flex-col  items-center mx-3">
              <p className="flex-1 block  font-bold text-5xl text-white max-w-full italic truncate">
                {playlist.name}
              </p>

              <p className="text-base font-bold text-gray-500 ">
                {Object.keys(playlist.songData).length} songs
              </p>
            </div>

            <IoMdClose
              size="30px"
              className="ml-2 text-gray-300 cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-2 gap-1">
            {songData?.map((song, i) => {
              if (song.artists) {
                return (
                  <TopChartCard
                    song={song}
                    i={i}
                    key={song.key}
                    isPlaying={isPlaying}
                    isFavorite={song.key.toString() in favoriteSongs}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                    handleFavorite={() => handleFavorite(song)}
                    handleUnfavorite={() => handleUnfavorite(song)}
                    isAdded={true}
                    handleAdd={() => {}}
                  />
                );
              } else return null;
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PlaylistWindow;
