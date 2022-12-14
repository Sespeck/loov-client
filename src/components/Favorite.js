import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Favorite = ({ isFavorite, handleFavorite, handleUnfavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <>
      {favorite && (
        <AiFillHeart
          size={30}
          className="text-gray-300"
          onClick={() => {
            handleUnfavorite();
            setFavorite(!favorite);
          }}
        />
      )}
      {!favorite && (
        <AiOutlineHeart
          size={30}
          className="text-gray-300"
          onClick={() => {
            handleFavorite();
            setFavorite(!favorite);
          }}
        />
      )}
    </>
  );
};

export default Favorite;
