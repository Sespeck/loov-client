import React from 'react';
import { useNavigate } from 'react-router-dom';
import Favorite from './Favorite';

function capitalizeFirst(arr) {
  return arr.map((element) => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });
}

const ArtistCard = ({
  track,
  isFavorite,
  handleFavorite,
  handleUnfavorite,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img
        alt="artist_img"
        src={track?.images?.background}
        className="w-full h-56 rounded-lg"
        onClick={() => navigate(`/artists/${track?.artists?.[0].adamid}`)}
      />
      <div className="flex mt-4 justify-between">
        <p
          className="font-semibold text-lg text-white truncate"
          onClick={() => navigate(`/artists/${track?.artists?.[0].adamid}`)}
        >
          {capitalizeFirst(
            decodeURIComponent(track?.artists?.[0]?.alias).split('-')
          ).join(' ')}
        </p>
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

export default ArtistCard;
