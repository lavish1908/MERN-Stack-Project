import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
// import { productData } from '../static/data';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  // console.log(allProducts);
  const { id } = useParams();
  // console.log(name);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');
  // const productName = name?.replace(/-/g, ' ');
  // console.log(data);
  useEffect(() => {
    // const data = productData.find((i) => i.name === productName);
    // const data = allProducts && allProducts.find((i) => i.name === productName);
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);
  // console.log(data);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {
        // data && <SuggestedProduct data={data} />
        !eventData && <>{data && <SuggestedProduct data={data} />}</>
      }
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
