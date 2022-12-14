import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePlay, handlePause }) =>
  isPlaying && activeSong?.key === song.key ? (
    <FaPauseCircle size={30} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={30} className="text-gray-300" onClick={handlePlay} />
  );
export default PlayPause;
