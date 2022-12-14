import SongBar from './SongBar';
const ArtistSongs = ({ data, isPlaying, activeSong, artistId }) => {
  return (
    <div className="ml-5 flex flex-col">
      <h1 className="text-2xl font-bold text-[#b7d5f6]">Top Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => {
          return (
            <SongBar
              key={`${song.id}-${artistId}-${i}`}
              song={song}
              i={i}
              isPlaying={isPlaying}
              artistId={artistId}
              activeSong={activeSong}
            ></SongBar>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistSongs;
