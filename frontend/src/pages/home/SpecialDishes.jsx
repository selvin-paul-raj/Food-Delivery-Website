import React, { useContext, useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../../component/card/Card';
import { AuthContext } from '../../context/AuthProvider'; 


const SpecialDishes = () => {
  const {Backend_Url,recepit}=useContext(AuthContext)
  
  const  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      }
    ]
  };

 


  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title leading-7 md:w-1/4">Standout Dishes From Our Menu</h2>
      </div>

     

      <Slider  {...settings} className="overflow-hidden mt-10 ">
        {recepit?.map((item, i) =><Card item={item}  key={i}  />)}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
