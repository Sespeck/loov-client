import SongBar from './SongBar';
const RelatedSongs = ({
  favoriteSongs,
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
  handleFavorite,
  handleUnfavorite,
}) => {
  return (
    <div className="ml-5 flex flex-col">
      {artistId ? (
        <h1 className="text-2xl font-bold text-[#b7d5f6]">Popular Songs</h1>
      ) : (
        <h1 className=" text-2xl font-bold text-[#b7d5f6]">
          You may also like:{' '}
        </h1>
      )}

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => {
          if (song.artists) {
            const isFavorite = song.key.toString() in favoriteSongs;

            return (
              <SongBar
                key={`${song.key}-${artistId}-${i}`}
                song={song}
                i={i}
                isPlaying={isPlaying}
                artistId={null}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                isFavorite={isFavorite}
                handleFavorite={() => handleFavorite(song)}
                handleUnfavorite={() => handleUnfavorite(song)}
              ></SongBar>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default RelatedSongs;
