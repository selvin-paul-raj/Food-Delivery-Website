import React from "react";
import test from "/images/home/testimonials/testimonials.png";
import img1 from "/images/home/testimonials/testimonial1.png";
import img2 from "/images/home/testimonials/testimonial2.png";
import img3 from "/images/home/testimonials/testimonial3.png";
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
  return (
    <div className="section-container">
      <div className="flex md:flex-row items-center justify-between gap-12 flex-col">
        <div className="md:w-1/2">
          <img src={test} alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-3/4">
            <p className="subtitle">Testimonials</p>
            <h2 className="title ">
              What Our Customers Say About Us
            </h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I had the pleasure of dining at Foodi last night, and I&apos;m
              still raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>
            
            {/* avatar */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src={img1} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                  <img src={img2} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                  <img src={img3} />
                  </div>
                </div>
               
              </div>
              <div className="space-y-1">
           <h3 className="text-lg font-semibold ">Customer Feedback</h3>
            <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="">4.5</span>
            <span className="">(18.6k Reviews)</span>

            </div>
           </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
