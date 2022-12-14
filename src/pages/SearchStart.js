import { Navigate } from 'react-router-dom';
import { Searchbar } from '../components';

const SearchStart = () => {
  const loggedInToken = window.localStorage.getItem('token');

  if (!loggedInToken) {
    console.log('Not authenticated, redirect to log in.');
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="flex flex-col">
        <Searchbar />
        <h2 className="mt-5 font-bold text-3xl text-white text-left">
          Start your search for a song or artist
        </h2>
      </div>
    );
  }
};
export default SearchStart;
