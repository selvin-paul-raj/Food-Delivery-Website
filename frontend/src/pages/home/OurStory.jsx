import React from 'react'

const OurStory = () => {
    const servicesList = [
        {
          id: 1,
          image: "/images/home/services/icon1.png",
          title: "Catering",
          des: "Delight your guests with our flavors and  presentation",
        },
        {
          id: 2,
          image: "/images/home/services/icon2.png",
          title: "Fast delivery",
          des: "We deliver your order promptly to your door",
        },
        {
          id: 3,
          image: "/images/home/services/icon3.png",
          title: "Online Ordering",
          des: "Explore menu & order with ease using our Online Ordering ",
        },
        {
          id: 4,
          image: "/images/home/services/icon4.png",
          title: "Gift Cards",
          des: "Give the gift of exceptional dining with Foodi Gift Cards",
        },
      ];
        
  return (
    <div className="section-container   py-16">
      <div className="flex md:flex-row items-center justify-between gap-12 flex-col">
        <div className="md:w-1/2 flex flex-col  w-full lg:w-auto">
       <div className="space-y-9">
       <p className="subtitle">Our Story & Services</p>
            <h2 className="title ">
            Our Culinary Journey <br /> And Services
            </h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
            Rooted in passion, we curate unforgettable dining <br /> experiences and offer exceptional services, <br /> blending culinary artistry with warm hospitality.
            </blockquote>
            <button className="btn bg-green flex items-center gap-2 rounded-full text-white px-6">Explore</button>
       </div>
        </div>
        <div className="md:w-1/2">
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-8 justify-around text-center mt-12">
        
        {servicesList?.map((item)=>(
              <div className="shadow-md rounded-sm bg-white py-5 px-4
                  cursor-pointer text-center space-y-2 hover:border-indigo-500 transition-all duration-75 hover:border" key={item.id}>
                 <img src={item.image} alt="" className="mx-auto " />
                  <h2 className="pt-3 font-semibold text-green">{item.title}</h2>
                  <p className="text-[#90BD95]">{item.des}</p>
                
              </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default OurStory
