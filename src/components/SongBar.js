import React from 'react';
import { Link } from 'react-router-dom';
import Favorite from './Favorite';

import PlayPause from './PlayPause';

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  isFavorite,
  handleFavorite,
  handleUnfavorite,
}) => (
  <>
    <div
      className={`w-full flex flex-row items-center hover:bg-[#345596] ${
        !artistId
          ? activeSong?.key === song?.key
            ? 'bg-[#345596] cursor-pointer'
            : 'bg-transparent cursor-pointer'
          : 'bg-transparent'
      } py-2 p-4 rounded-lg  mb-2`}
    >
      {/* <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3> */}
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={
            artistId
              ? song?.attributes?.artwork?.url
                  .replace('{w}', '125')
                  .replace('{h}', '125')
              : song?.images?.coverart
          }
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${song.key}`}>
              <p className="text-xl font-bold text-white">{song?.title}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-400 mt-1">
            {artistId ? (
              song?.attributes?.albumName
            ) : (
              <Link
                to={
                  song.artists
                    ? `/artists/${song?.artists[0]?.adamid}`
                    : 'top-artists'
                }
              >
                {song.subtitle}
              </Link>
            )}
          </p>
        </div>
      </div>
      {!artistId && (
        <Favorite
          isFavorite={isFavorite}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
        />
      )}
      <div className="w-[8px]" />
      {!artistId ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      ) : null}
    </div>
  </>
);

export default SongBar;
