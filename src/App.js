// Run 'npx eslint . --fix' to remove all unused imports from th project library

import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { useState } from 'react';
import { Sidebar, MusicPlayer } from './components';

import {
  ArtistDetails,
  TopArtists,
  Yours,
  Discover,
  Search,
  Player,
  TopCharts,
  SongDetails,
  SignUp,
  Login,
  Profile,
  SignOut,
} from './pages';
import {
  RecentlyPlayed,
  Songs,
  PlayLists,
  Artists,
} from './components/homeComponents';
import SearchStart from './pages/SearchStart';
import LoginButton from './components/LoginButton';
import AdminPortal from './pages/AdminPortal';
import About from './components/About';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const [playerOpen, setPlayerOpen] = useState(false);
  const loggedInToken = window.localStorage.getItem('token');
  const [authenticated, setAuthenticated] = useState(loggedInToken !== null);
  const clearAuthentication = () => {
    window.localStorage.clear();
    setAuthenticated(false);
  };
  return (
    <div>
      <div className="relative flex w-full h-screen overflow-y-scroll hide-scrollbar ">
        {authenticated && <Sidebar />}
        <About />
        <div className=" flex-1 flex flex-col bg-gradient-to-br from-black to-[rgb(9,97,184)]">
          {/* to-[rgb(130,0,104)] */}
          <div className="flex w-screen justify-center items-center my-5">
            <img
              src={logo}
              alt="logo"
              className="text-center   h-12 object-contain"
            />{' '}
            <span className=" mx-5 text-white font-logo  text-4xl ">Loov</span>
          </div>

          <div className="px-6 h-screen overflow-y-scroll hide-scrollbar flex ">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/signout"
                  element={
                    <SignOut clearAuthentication={clearAuthentication} />
                  }
                />
                <Route path="/yours" element={<Yours />}>
                  <Route
                    path="/yours"
                    element={<Navigate to="/yours/recent" replace />}
                  />
                  <Route path="/yours/recent" element={<RecentlyPlayed />} />
                  <Route path="/yours/songs" element={<Songs />} />
                  <Route path="/yours/artists" element={<Artists />} />
                  <Route path="/yours/playlists" element={<PlayLists />} />
                </Route>
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/search-start" element={<SearchStart />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminPortal />} />
                <Route
                  path="*"
                  element={
                    <h2 className=" mt-10 text-center text-white text-2xl font-bold ">
                      {' '}
                      There is nothing here
                    </h2>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>

        {authenticated &&
        !['/login', '/signup'].includes(window.location.pathname) ? (
          activeSong?.title ? (
            <>
              <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-11">
                <MusicPlayer openPlayer={() => setPlayerOpen(!playerOpen)} />
              </div>
              <div
                className={` top-0 w-full backdrop-blur-lg p-10 fixed ease-in-out duration-300 z-10 ${
                  playerOpen ? 'translate-y-0 ' : 'translate-y-full'
                }`}
              >
                <Player closePlayer={() => setPlayerOpen(false)} />
              </div>
            </>
          ) : (
            <div className="absolute flex justify-center h-28 bottom-0 left-0 right-0  items-center animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
              <p className="block mb-2 text-xl font-bold text-[#9eb9f2] dark:text-white">
                {' '}
                Select a song demo to play
              </p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default App;
