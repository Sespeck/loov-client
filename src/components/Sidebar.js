import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { links } from '../assets/constants';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {!mobileMenuOpen && (
        <div className="absolute w-6 h-6 text-white ml-5 mr-2 top-5 hover:cursor-pointer">
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2 hover:cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      )}

      <div
        className={`absolute top-0 h-screen w-fit  bg-gradient-to-tl from-[#1360a3] to-[#1e144b] backdrop-blue-lg z-10 p-6 smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <RiCloseLine
          className="font-bold w-6 h-6 text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        />
        {links.map((item, i) => {
          if (
            item.name === 'Admin' &&
            JSON.parse(window.localStorage.getItem('user')).userType !==
              'Administrator'
          ) {
            return null;
          } else
            return (
              <div key={item.name} onClick={() => setMobileMenuOpen(false)}>
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex justify-start items-center my-8 text-md font-bold text-gray-200 hover:text-[rgb(165,210,255)]"
                >
                  <item.icon className="w-6 h-6 mr-2" />
                  {item.name}
                </Link>
              </div>
            );
        })}
      </div>
    </>
  );
};

export default Sidebar;
