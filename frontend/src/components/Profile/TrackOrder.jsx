import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../redux/actions/order';
import Lottie from 'react-lottie';
import animationData1 from '../../assets/animations/OrderProcessing.json';
import animationData2 from '../../assets/animations/Shipped.json';
import animationData3 from '../../assets/animations/OnTheWay.json';
import animationData4 from '../../assets/animations/Delivered.json';

const OrderProcessing = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your Order is processing in the shop!!
      </h5>
      <br />
      <br />
    </div>
  );
};

const Shipped = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your Order has been Shipped Successfully!!
      </h5>
      <br />
      <br />
    </div>
  );
};

const OnTheWay = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Our Delivery man is going to deliver your order!!
      </h5>
      <br />
      <br />
    </div>
  );
};

const Delivered = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData4,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order has been delivered successfully!!
      </h5>
      <br />
      <br />
    </div>
  );
};

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {' '}
      <>
        {data && data?.status === 'Processing' ? (
          <OrderProcessing />
        ) : data?.status === 'Shipping' ? (
          <Shipped />
        ) : data?.status === 'On the way' ? (
          <OnTheWay />
        ) : data?.status === 'Delivered' ? (
          <Delivered />
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
