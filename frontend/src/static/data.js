// navigation Data
import { RiCoupon3Line } from 'react-icons/ri';
import { TiStarOutline } from 'react-icons/ti';
import { GiPresent } from 'react-icons/gi';
import { RiLock2Line } from 'react-icons/ri';
import ManjushaPainting from '../assets/images/Shivji ki Puja Manjusha Painting.jpg';
import KalighatPainting from '../assets/images/Radha-Krishna-Kalighat-Pat-Art-Rahman-Chitrakar-01.jpeg';
import GondPainting from '../assets/images/treeoflife gond.jpeg';
import MeenakariPainting from '../assets/images/decorative meenakari.jpeg';
import WarliPainting from '../assets/images/warli.jpg';
import CheriyalPainting from '../assets/images/cheriyal.jpeg';
import KeralaMural from '../assets/images/krishna kerala murals.jpg';
import MysorePainting from '../assets/images/mysore painting.jpg';
import TagorePainting from '../assets/images/tagore.jpeg';
import PattachitraPainting from '../assets/images/Pattachitra.jpg';
export const navItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Best Selling',
    url: '/best-selling',
  },
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Events',
    url: '/events',
  },
  {
    title: 'FAQ',
    url: '/faq',
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: 'Welcome Coupons',
    Description: 'Get upto 10% off',
    icon: <RiCoupon3Line className="text-[#ed8404] text-[38px]" />,
  },
  {
    id: 2,
    title: 'Direct from Artists',
    Description: 'Buy directly from artists at affordable prices',
    icon: <TiStarOutline className="text-[#ed8404] text-[38px]" />,
  },
  {
    id: 3,
    title: 'Daily Art Deals',
    Description: 'Uncover daily surprise offers',
    icon: <GiPresent className="text-[#ed8404] text-[38px]" />,
  },
  {
    id: 4,
    title: 'Secure Payments',
    Description: '100% protected payments',
    icon: <RiLock2Line className="text-[#ed8404] text-[38px]" />,
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: 'Manjusha Painting',
    subTitle: '',
    image_Url: `${ManjushaPainting}`,
  },
  {
    id: 2,
    title: 'Kalighat Painting',
    subTitle: '',
    image_Url: `${KalighatPainting}`,
  },
  {
    id: 3,
    title: ' Gond Painting',
    subTitle: '',
    image_Url: `${GondPainting}`,
  },
  {
    id: 4,
    title: 'Meenakari Painting',
    subTitle: '',
    image_Url: `${MeenakariPainting}`,
  },
  {
    id: 5,
    title: 'Warli Painting',
    subTitle: '',
    image_Url: `${WarliPainting}`,
  },
  {
    id: 6,
    title: 'Cheriyal Painting',
    subTitle: '',
    image_Url: `${CheriyalPainting}`,
  },
  {
    id: 7,
    title: 'Kerala Mural Painting',
    subTitle: '',
    image_Url: `${KeralaMural}`,
  },
  {
    id: 8,
    title: 'Mysore Handicraft',
    subTitle: '',
    image_Url: `${MysorePainting}`,
  },
  {
    id: 9,
    title: 'Tagore Painting',
    subTitle: '',
    image_Url: `${TagorePainting}`,
  },
  {
    id: 10,
    title: 'Pattachitra Painting',
    subTitle: '',
    image_Url: `${PattachitraPainting}`,
  },
];

export const footerProductLinks = [
  {
    name: 'About us',
    link: '/',
  },
  {
    name: 'Our Team',
    link: '/',
  },
  {
    name: 'Blog',
    link: '/',
  },

  {
    name: 'Careers',
    link: '/',
  },
];

export const footerCompanyLinks = [
  {
    name: 'All Products',
    link: '/products',
  },
  {
    name: 'Best Selling',
    link: '/best-selling',
  },
  {
    name: 'Events',
    link: '/events',
  },
  {
    name: 'FAQ',
    link: '/faq',
  },
];

export const footerSupportLinks = [
  {
    name: 'Newsletter',
    link: '/',
  },
  {
    name: 'Reviews',
    link: '/',
  },
  {
    name: 'Contact Us',
    link: '/',
  },
  {
    name: 'Terms of Service',
    link: '/',
  },
];
