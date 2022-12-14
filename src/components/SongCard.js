import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import Favorite from './Favorite';
import AddPlaylist from './AddPlaylist';
const SongCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  data,
  isFavorite,
  handleFavorite,
  handleUnfavorite,
  updateSongPlaylist,
}) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[220px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ">
      <div className="relative w-full h-fit group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.key === song.key
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}> {song.title} </Link>
        </p>
        <div className="flex justify-between">
          <p className="flex-1 first-letter:text-sm truncate text-gray-300 mt-1">
            <Link
              to={
                song.artists
                  ? `/artists/${song?.artists[0]?.adamid}`
                  : 'top-artists'
              }
            >
              {song.subtitle}
            </Link>
          </p>
          {updateSongPlaylist}

          <Favorite
            isFavorite={isFavorite}
            handleFavorite={handleFavorite}
            handleUnfavorite={handleUnfavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
