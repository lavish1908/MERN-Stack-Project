import React from 'react';
import { productData } from '../../static/data';
import styles from '../../styles/styles';
import ProductCard from './ProductCard/ProductCard';

const Sponsored = () => {
  return (
    <div>
      <div
        className={`${styles.section}hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
      >
        <div className={`flex justify-between w-full`}>
          <div className="flex items-start"></div>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {productData &&
            productData.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
