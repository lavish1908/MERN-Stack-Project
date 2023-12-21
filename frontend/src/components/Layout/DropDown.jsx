import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 1000px:w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm mt-[60px] h-[445px] w-[145px] 1000px:mt-0 overflow-y-scroll no-scrollbar">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'contain',
                marginLeft: '10px',
                userSelect: 'none',
              }}
              alt="Drop Down img"
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
