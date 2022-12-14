import {
  HiSearch,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineHashtag,
} from 'react-icons/hi';

import { RiAdminLine } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import { TbPlaylist } from 'react-icons/tb';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { name: 'Home', to: '/', icon: HiOutlineHome },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Yours', to: '/yours', icon: TbPlaylist },
  { name: 'Search', to: '/search-start', icon: HiSearch },
  { name: 'Profile', to: '/profile', icon: HiOutlineUser },
  { name: 'Admin', to: '/admin', icon: RiAdminLine },
  { name: 'Sign Out', to: '/signout', icon: GoSignOut },
];

export const isActiveStyles =
  'text-lg text-headingColor font-semibold hover:text-headingColor duration-100 transition-all ease-in-out';
export const isNotActiveStyles =
  'text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out';

export const bgColors = [
  '#E9E2FF',
  '#FAE2FF',
  '#FFE2E6',
  '#E2FFE9',
  '#E2F4FF',
  '#FFFFE2',
];
