import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/styles';
// import { productData } from '../../../static/data';
import ProductCard from '../ProductCard/ProductCard';

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    // const d =
    //   productData && productData.sort((a, b) => b.sold_out - a.sold_out);
    // const firstFive = d.slice(0, 5);
    // const firstFive = allProducts && allProducts.slice(0, 5);
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h2>Best Deals</h2>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* {data && data.map((i, index) => <ProductCard data={i} key={index} />)} */}
          {data && data.length !== 0 && (
            <>
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
