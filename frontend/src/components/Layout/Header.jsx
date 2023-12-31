import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { productData, categoriesData } from '../../static/data';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import DropDown from './DropDown';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import Cart from '../cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx';
import Kalakriti from '../../assets/KalaKriti.png';
import { toast } from 'react-toastify';

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [drop, setDrop] = useState(1);

  // Handle search change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter products
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const closeSearchResults = (e) => {
    const searchBox = document.getElementById('searchBox'); // add an id to the search input
    const searchResults = document.getElementById('searchResults'); // add an id to the search results div

    if (
      searchBox &&
      searchResults &&
      !searchBox.contains(e.target) &&
      !searchResults.contains(e.target)
    ) {
      setSearchData(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeSearchResults);

    return () => {
      document.removeEventListener('click', closeSearchResults);
    };
  }, []);

  const handleCart = () => {
    if (isAuthenticated) {
      setOpenCart(true);
    } else {
      toast.error('Please Login');
    }
  };
  const handleWishlist = () => {
    if (isAuthenticated) {
      setOpenWishlist(true);
    } else {
      toast.error('Please Login');
    }
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between ">
          <div>
            <Link to="/">
              <img src={Kalakriti} alt="" className="h-[70px] w-[70px]" />
            </Link>
          </div>
          {/*Search box  */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search for product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              id="searchBox"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {
              // Search data if length is not 0 then show
              searchData && searchData.length !== 0 ? (
                <div
                  id="searchResults"
                  className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4"
                >
                  {searchData &&
                    searchData.map((i, index) => {
                      // const d = i.name;

                      // const Product_name = d.replace(/\s+/g, '-');
                      return (
                        // <Link to={`/product/${Product_name}`}>
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              // src={i.image_Url[0].url}
                              src={`${backend_url}${i.images[0]}`}
                              alt="img"
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null
            }
          </div>
          {/* Search end */}

          {/* Become a Seller */}
          <div className={`${styles.button}`}>
            {/* <Link to="/shop-create"> */}
            <Link to={`${isSeller ? '/dashboard' : '/shop-create'}`}>
              <h1 className="text-[#fff] flex items-center">
                {/* Become Seller <IoIosArrowForward className="ml-1" /> */}
                {isSeller ? 'Go Dashboard' : 'Become Seller'}{' '}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
          {/* Become a Seller end */}
        </div>
      </div>

      {/*  2nd part of header start */}
      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* Catagories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
            <div className="relative h-[60px] mt-[10px] w-[115px] 1000px:hidden ">
              {drop === 1 ? (
                <div>
                  <BiMenuAltLeft
                    size={30}
                    className="absolute top-3 left-2 cursor-pointer"
                    onClick={() => {
                      setDropDown(!dropDown);
                      setDrop(2);
                    }}
                  />
                  {dropDown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              ) : (
                <div>
                  <RxCross1
                    size={30}
                    className="absolute top-3 left-2 cursor-pointer"
                    onClick={() => {
                      setDropDown(!dropDown);
                      setDrop(1);
                    }}
                  />
                  {dropDown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* NavItems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => handleWishlist()}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {/* 0 */}
                  {isAuthenticated && wishlist ? wishlist.length : 0}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => handleCart()}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {/* 1 */}
                  {isAuthenticated && cart ? cart.length : 0}
                </span>
              </div>
            </div>

            {/* avatar */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* Avatar end */}
            {/* cart popup start */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* card popup end */}

            {/* Wish list pop uo Start */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
            {/* Wish list pop uo end */}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        }
            w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between h-[60px]">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={Kalakriti}
                alt=""
                className="cursor-pointer h-[50px] w-[70px]"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative cursor-pointer mr-[20px]"
              onClick={() => handleCart()}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {/* 0 */}
                {isAuthenticated && cart ? cart.length : 0}
              </span>
            </div>
          </div>
        </div>
        {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
      </div>

      {/*  side bar*/}
      {open ? (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart
                    size={30}
                    className="mt-5 ml-3"
                    onClick={() => handleWishlist()}
                  />
                  <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    {/* 0 */}
                    {isAuthenticated && wishlist ? wishlist.length : 0}
                  </span>
                </div>
              </div>

              <RxCross1
                size={30}
                className="ml-4 mt-5 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Search Bar */}
            <div className="my-8 w-[92%] m-auto h-[40px relative]">
              <input
                type="search"
                placeholder="Search for products"
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchTerm}
                onChange={handleSearchChange}
                id="searchBox"
              />

              {
                // Search data if length is not 0 then show
                searchData && searchData.length !== 0 ? (
                  <div
                    id="searchResults"
                    className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3"
                  >
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g, '-');
                        return (
                          <Link to={`/product/${Product_name}`}>
                            <div className="flex items-center">
                              <img
                                // src={i.image_Url[0].url}
                                src={`${backend_url}${i.images[0]}`}
                                alt="img"
                                className="w-[50px] mr-2"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null
              }
            </div>
            <Navbar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to="/shop-create">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <br />

            {/* Mob Login */}
            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      alt="Profile img"
                      className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7]"
                  >
                    Login /
                  </Link>
                  <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      ) : null}
    </>
  );
};

export default Header;
