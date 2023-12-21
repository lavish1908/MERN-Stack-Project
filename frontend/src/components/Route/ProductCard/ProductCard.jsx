import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard.jsx';
import { backend_url } from '../../../server.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../../redux/actions/wishlist';
import { addToCart } from '../../../redux/actions/cart';
import { toast } from 'react-toastify';

const ProductCard = ({ data, isEvent }) => {
  console.log(data.shop);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const isOutOfStock = data?.stock - data?.sold_out <= 0;

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

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
          const cartData = { ...data, qty: 1 };
          dispatch(addToCart(cartData));
          toast.success('Item added to cart successfully!');
        }
      }
    } else {
      toast.error('Please Login');
    }
  };

  return (
    <>
      <div
        className={`w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ${
          isOutOfStock ? 'opacity-50' : ''
        }`}
      >
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt="prd"
            className={`w-[90%] h-[190px] object-contain ${
              !isOutOfStock
                ? 'hover:scale-105 transition-transform duration-300 ease-in-out'
                : ''
            }`}
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}
          </h4>

          {/* <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                Rs
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
              </h5>

              <h4 className={`${styles.price}`}>
                {data.originalPrice ? 'Rs ' + data.originalPrice : null}
              </h4>
            </div>

            <span className="font-[400] text-[17px] text-[#eb0000]">
              {data?.stock - data?.sold_out} left !!
            </span>
          </div> */}
          {isOutOfStock ? (
            // Display "Out of stock" message
            <span className="font-[500] text-[20px] text-[#eb0000]">
              Out of stock
            </span>
          ) : (
            // Display prices when not out of stock
            <div className="py-2 flex items-center justify-between">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice}`}>
                  Rs
                  {data.originalPrice === 0
                    ? data.originalPrice
                    : data.discountPrice}
                </h5>

                <h4 className={`${styles.price}`}>
                  {data.originalPrice ? 'Rs ' + data.originalPrice : null}
                </h4>
              </div>

              <span className="font-[400] text-[17px] text-[#eb0000]">
                {data?.stock - data?.sold_out} left !!
              </span>
            </div>
          )}
        </Link>

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? 'red' : '#333'}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => !isOutOfStock && addToWishlistHandler(data)}
              color={click ? 'red' : '#333'}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            // onClick={() => setOpen(!open)}
            onClick={() => !isOutOfStock && setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            // onClick={() => addToCartHandler(data._id)}
            onClick={() => !isOutOfStock && addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {/* {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null} */}
          {open && !isOutOfStock ? (
            <ProductDetailsCard setOpen={setOpen} data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
