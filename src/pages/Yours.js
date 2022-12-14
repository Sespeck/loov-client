import { Navigate } from 'react-router-dom';
import { BiAlbum } from 'react-icons/bi';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiMusicFill } from 'react-icons/ri';
import { Outlet, NavLink } from 'react-router-dom';
import { TopBarIcon } from '../components/TopBarIcon';

const Yours = () => {
  // const { data, isFetching, error } = useGetTopChartsQuery();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // if (isFetching) return <Loader title="Loading songs ..." />;
  // if (error) return <Error />;

  const loggedInToken = window.localStorage.getItem('token');

  if (!loggedInToken) {
    console.log('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
        <div className="w-full h-auto flex flex-col items-center ">
          <div className=" h-auto flex flex-row gap-2 w-[60%] justify-center items-center">
            <NavLink className="w-[100px]" to={'/yours/recent'}>
              <TopBarIcon
                icon={<RiCompassDiscoverLine size="25" />}
                label="Recent"
              />
            </NavLink>
            <NavLink className="w-[100px]" to={'/yours/songs'}>
              <TopBarIcon icon={<BiAlbum size="25" />} label="Songs" />
            </NavLink>
            <NavLink className="w-[100px]" to={'/yours/artists'}>
              <TopBarIcon icon={<AiOutlineHeart size="25" />} label="Artists" />
            </NavLink>
            <NavLink className="w-[120px]" to={'/yours/playlists'}>
              <TopBarIcon icon={<RiMusicFill size="25" />} label="Playlists" />
            </NavLink>
          </div>
          <Outlet />
        </div>
      </>
    );
  }
};
export default Yours;
