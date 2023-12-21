// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from '../../../styles/styles';
// import ai from '../../../assets/ai.png';
// const Hero = () => {
//   return (
//     <div
//       className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
//       style={{
//         backgroundImage: `url(${ai})`,
//         opacity: '0.1',
//       }}
//     >
//       <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
//         <h1
//           className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
//         >
//           Best Collection for <br /> home Decoration
//         </h1>
//         <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
//           assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
//           quidem asperiores, laudantium temporibus soluta optio consequatur{' '}
//           <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
//         </p>
//         <Link to="/products" className="inline-block">
//           <div className={`${styles.button} mt-5`}>
//             <span className="text-[#fff] font-[Poppins] text-[18px]">
//               Shop Now
//             </span>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import ai from '../../../assets/ai.png';

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage: `url(${ai})`,
        backgroundSize: 'cover',
        // backgroundPositionY: '-0rem', // Make sure the background image covers the entire container
      }}
    >
      <div
        className={`${styles.section} w-[100%] pl-12`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }} // Set the background color with opacity
      >
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize mt-[150px]`}
        >
          Kalakriti: Transform Your Space <br /> with Unique Artistry
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{' '}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block mb-[98px]">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
