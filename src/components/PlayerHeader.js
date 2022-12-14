import { Link } from 'react-router-dom';
import Favorite from './Favorite';
import PlayPause from './PlayPause';

const PlayerHeader = ({
  artistId,
  artistData,
  songData,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  isFavorite,
  handleFavorite,
  handleUnfavorite,
  updateSongPlaylist,
}) => {
  const artist = artistData?.attributes;
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full rounded-full bg-gradient-to-l from-transparent to-[#1160df85] h-fit p-5">
        <div className=" flex items-center justify-between">
          <div className=" flex items-center">
            <img
              alt="artwork"
              src={
                artistId
                  ? artist.artwork?.url
                      .replace('{w}', '300')
                      .replace('{h}', '300')
                  : songData?.images?.coverart
              }
              className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
            />
            <div className="ml-5">
              <p className="font-bold sm:text-3xl text-xl text-white">
                {artistId ? artist?.name : songData?.title}
              </p>

              {!artistId && (
                <Link to={`/artist/${songData?.artists?.[0].adamid}`}>
                  <p className="text-base text-gray-400 mt-2">
                    {songData?.subtitle}
                  </p>
                </Link>
              )}
              <p className="text-base text-gray-400 mt-2">
                {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
              </p>
            </div>
          </div>
          <div className="flex cursor-pointer">
            <Favorite
              isFavorite={isFavorite}
              handleFavorite={handleFavorite}
              handleUnfavorite={handleUnfavorite}
            />
            <div className="w-[8px]" />
            {updateSongPlaylist}
            <div className="w-[8px]" />
            {!artistId && (
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={songData}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(songData, 0)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
