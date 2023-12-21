import React, { useState, useEffect } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductsShop } from '../../redux/actions/product';
import { backend_url } from '../../server';
import styles from '../../styles/styles';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/actions/wishlist';
import { addToCart } from '../../redux/actions/cart';
import { toast } from 'react-toastify';

const ProductDetails = ({ data }) => {
  console.log(data?.shop?.avatar);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const isOutOfStock = data?.stock - data?.sold_out <= 0;

  const removeFromWishlistHandler = (data) => {
    if (isAuthenticated) {
      setClick(!click);
      dispatch(removeFromWishlist(data));
    } else {
      toast.error('Please Login');
    }
  };

  const addToWishlistHandler = (data) => {
    if (isAuthenticated) {
      setClick(!click);
      dispatch(addToWishlist(data));
    } else {
      toast.error('Please Login');
    }
  };

  const addToCartHandler = (id) => {
    if (isAuthenticated) {
      const isItemExists = cart && cart.find((i) => i._id === id);
      if (isItemExists) {
        toast.error('Item already in cart!');
      } else {
        if (data.stock < 1) {
          toast.error('Product stock limited!');
        } else {
          const cartData = { ...data, qty: count };
          dispatch(addToCart(cartData));
          toast.success('Item added to cart successfully!');
        }
      }
    } else {
      toast.error('Please Login');
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  // src={data.image_Url[select].url}
                  src={`${backend_url}${data && data.images[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? 'border' : 'null'
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${
                      select === 1 ? 'border' : 'null'
                    } cursor-pointer `}
                  ></div>
                </div>
              </div>
              {/* Right */}
              <div className="w-full 800px:w-[50%] pt-5 ">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                {isOutOfStock ? (
                  <div className="mt-[25px]">
                    <span className="font-[500] text-[23px] text-[#eb0000]">
                      Out of stock
                    </span>
                  </div>
                ) : (
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {/* {data.discount_price}$ */}
                      {data.discountPrice}$
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {/* {data.price ? data.price + '$' : null} */}
                      {data.originalPrice ? data.originalPrice + '$' : null}
                    </h3>
                  </div>
                )}

                {/* inc dec option */}
                {!isOutOfStock && (
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>

                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>

                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>

                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          // onClick={() => setClick(!click)}
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? 'red' : '#333'}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          // onClick={() => setClick(!click)}
                          onClick={() => addToWishlistHandler(data)}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                )}
                {!isOutOfStock && (
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    // onClick={() => addToCartHandler()
                    // }
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to Cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                )}
                <div className="flex items-center pt-8 pb-4">
                  <Link to={`/shop/preview/${data?.shop._id}`} className="flex">
                    <img
                      // src={data.shop.shop_avatar.url}
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full m-auto"
                    />
                    <div className="pr-8 ml-[10px]">
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details  info */}

          {/* <ProductDetailsInfo data={data} /> */}
          <ProductDetailsInfo data={data} products={products} />
          <br />
          <br />
        </div>
      ) : (
        <div>No Product found!!</div>
      )}
    </div>
  );
};

// const ProductDetailsInfo = ({ data }) => {
const ProductDetailsInfo = ({ data, products }) => {
  // console.log(products);
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-around border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(2)}
          >
            Seller Information
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line ">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <>
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className="flex items-center">
                  <img
                    // src={data.shop.shop_avatar.url}
                    src={`${backend_url}${data?.shop?.avatar}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                    // className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-3">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  </div>
                </div>
              </Link>
              <p className="pt-2">{data.shop.description}</p>
            </div>

            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on:{' '}
                  <span className="font-[500]">
                    {data.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total Products:{' '}
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </h5>
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                  >
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProductDetails;
