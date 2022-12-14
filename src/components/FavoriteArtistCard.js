import React from 'react';
import { useNavigate } from 'react-router-dom';
import Favorite from './Favorite';

const FavoriteArtistCard = ({
  artistId,
  artistData,
  isFavorite,
  handleFavorite,
  handleUnfavorite,
}) => {
  const navigate = useNavigate();
  const artist = artistData?.attributes;
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img
        alt="artist_img"
        src={artist.artwork?.url.replace('{w}', '300').replace('{h}', '300')}
        className="w-full h-56 rounded-lg"
        onClick={() => navigate(`/artists/${artistId}`)}
      />
      <div className="flex mt-4 justify-between">
        <div>
          <p
            className="font-semibold text-lg text-white truncate"
            onClick={() => navigate(`/artists/${artistId}`)}
          >
            {artist.name}
          </p>
          <p className="text-base text-gray-400 ">{artist.genreNames[0]}</p>
        </div>

        <Favorite
          isFavorite={isFavorite}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
          className="z-10"
        />
      </div>
    </div>
  );
};

export default FavoriteArtistCard;
