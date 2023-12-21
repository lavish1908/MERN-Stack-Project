import React from 'react';
import styles from '../../styles/styles';
import CountDown from './CountDown';
import { backend_url } from '../../server';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cart';
import { toast } from 'react-toastify';

const EventCard = ({ active, data }) => {
  // console.log(data);

  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    if (isAuthenticated) {
      const isItemExists = cart && cart.find((i) => i._id === data._id);
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

  return data === undefined ? (
    <div>
      <h4>No current events!</h4>
    </div>
  ) : (
    <div
      className={`   w-full block rounded-lg ${
        active ? 'unset' : 'mb-12'
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto bg-gray-50">
        {/* <img
          src="https://m.media-amazon.com/images/I/61xbIIAYRFL._AC_UF1000,1000_QL80_.jpg"
          alt="img event cart"
          className="h-[400px] w-[500px]"
        /> */}
        <img
          src={`${backend_url}${data.images[0]}`}
          alt=""
          className="h-[400px] w-[500px] m-auto"
        />
      </div>

      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        {/* <h2 className={`${styles.productTitle}`}>Mongusha Painting</h2> */}
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {/* $ 12455 */}
              {data?.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {/* $ 9999 */}
              {data?.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-[600] text-[18px] text-[#eb0000]">
            {data?.stock - data?.sold_out} left !!
          </span>
        </div>
        {/* <CountDown /> */}
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
