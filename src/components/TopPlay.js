import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import 'swiper/css';
import 'swiper/css/free-mode';
import Favorite from './Favorite';
import TopChartCard from './TopChartCard';
import { updateFavoriteSongs } from '../services/FavoriteService';
import customSnackBar from './customSnackBar';
import TopSongCard from './TopSongCard';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  // useEffect(() => {
  //   divRef.current.scrollIntoView({ behavior: 'smooth' });
  // });

  const topSongs = data?.slice(0, 10);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  // const [favoriteSongs, setFavoriteSongs] = useState(
  //   JSON.parse(window.localStorage.getItem('user')).favoriteSongs
  // );
  // const handleFavorite = (songKey) => {
  //   const newFavoriteSongs = [...favoriteSongs, songKey];
  //   setFavoriteSongs(newFavoriteSongs);
  //   updateFavoriteSongs({ songList: newFavoriteSongs });
  //   openSnackBar('You favorited a new song');
  // };
  // const handleUnFavorite = (songKey) => {
  //   const newFavoriteSongs = [...favoriteSongs];
  //   const index = newFavoriteSongs.indexOf(songKey);
  //   if (index > -1) {
  //     newFavoriteSongs.splice(index, 1);
  //   }
  //   setFavoriteSongs((favoriteSongs) => newFavoriteSongs);
  //   updateFavoriteSongs({ songList: newFavoriteSongs });
  //   openSnackBar('You unfavorited a song');
  // };
  // //--------------- SnackBar consts and functions-----------
  // const [openBar, setOpenBar] = useState(false);
  // const [snackBarMessage, setSnackBarMessage] = useState('');
  // const openSnackBar = (message) => {
  //   setSnackBarMessage(message);
  //   setOpenBar(true);
  // }; //---
  return (
    <>
      {/* {customSnackBar({ openBar, setOpenBar, snackBarMessage })} */}
      <div ref={divRef} className="w-full flex-col justify-center mb-4 z-0">
        {/* Top Charts */}
        <div className="w-full flex justify-between items-center mt-4 mb-4">
          <h2 className="font-bold text-3xl text-white text-left">
            Top Charts
          </h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer font-bold">
              See more
            </p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topSongs?.slice(0, 5).map((song, i) => {
            if (song.artists) {
              return (
                <TopSongCard
                  song={song}
                  i={i}
                  key={song.key}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={handlePlayClick}
                />
              );
            } else return null;
          })}
        </div>

        {/* Top Artists */}
        <div className="w-full flex justify-between items-center  mt-4 mb-4">
          <h2 className="font-bold text-3xl text-white text-left">
            Top Artists
          </h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer font-bold">
              See more
            </p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4 -z-10"
        >
          {topSongs?.map((song, i) => {
            if (song.artists) {
              return (
                <SwiperSlide
                  key={song?.key}
                  style={{ width: '15%', height: 'auto' }}
                  className="shadow-lg rounded-full animate-slideright "
                >
                  <Link to={`/artists/${song?.artists?.[0].adamid}`}>
                    <img
                      src={song?.images.background}
                      alt="name"
                      className="rounded-full w-full object-cover "
                    />
                  </Link>
                </SwiperSlide>
              );
            } else return null;
          })}
        </Swiper>
      </div>
    </>
  );
};

export default TopPlay;
