import React from "react";
import banner from "/images/home/banner.png";
import food1 from "/images/home/b-food1.png";

const Banner = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row-reverse items-center justify-between py-12 lg:py-24 gap-8">
        {/* images */}
        <div className="md:w-1/2 w-full">
          <img src={banner} alt="" className="w-full h-auto" /> {/* Make the banner image responsive */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-center gap-6 -mt-24"> {/* Adjusted gap for smaller screens */}
            
            {/* First food item */}
            <div className="flex  bg-white py-2 px-3 rounded-2xl items-center  shadow-md  sm:w-64 ">
              <img src={food1} alt="" className="rounded-2xl w-20 h-20 mr-6" />
              <div className="space-y-1 ">
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow-500" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow-500" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow-500" readOnly checked />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow-500" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow-500" readOnly />
                </div>
                <p><span className="text-red text-sm">$</span>18.00</p>
              </div>
            </div>

            {/* Second food item (hidden on small screens) */}
            <div className="lg:flex hidden bg-white py-2 px-3 rounded-2xl items-center  shadow-md sm:w-64 ">
              <img src={food1} alt="" className="rounded-2xl w-20 h-20 mr-6 " />
              <div className="space-y-1 ">
                <h5 className="font-medium mb-1">Spicy noodles</h5>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star bg-yellow-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star bg-yellow-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star bg-yellow-500" readOnly checked />
                  <input type="radio" name="rating-2" className="mask mask-star bg-yellow-500" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star bg-yellow-500" readOnly />
                </div>
                <p><span className="text-red text-sm">$</span>18.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h1 className="md:text-4xl text-5xl font-extrabold md:leading-snug leading-snug">
            Dive into Delights
            <br /> Of Delectable <span className="text-green">Food</span>
          </h1>
          <p className="lg:text-xl text-[#4A4A4A] text-lg">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="btn bg-green rounded-full text-white px-8 py-3 drop-shadow-xl font-semibold">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
