import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ lastSearch }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(lastSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchText}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="mt-5 outline rounded-full p-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-1"
        />
      </div>
    </form>
  );
};

export default Searchbar;
