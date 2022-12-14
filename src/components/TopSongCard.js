import { Link } from 'react-router-dom';
import Favorite from './Favorite';
import PlayPause from './PlayPause';

const TopSongCard = ({
  song,
  i,

  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#345596] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title} </p>
        </Link>
        <Link to={`/artists/${song?.artists?.[0].adamid}`}>
          <p className="text-base font-bold text-gray-500 mt-1">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>

    <div className="w-[8px]" />
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={() => handlePlayClick(song, i)}
    />
  </div>
);
export default TopSongCard;
