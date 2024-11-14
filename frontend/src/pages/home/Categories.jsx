import React from "react";

const Categories = () => {
  const categoriesItems = [
    {
      id: 1,
      image: "/images/home/category/img1.png",
      title: "Main Dish",
      des: "86 dishes",
    },
    {
      id: 2,
      image: "/images/home/category/img2.png",
      title: "Break Fast",
      des: "12 break fast",
    },
    {
      id: 3,
      image: "/images/home/category/img3.png",
      title: "Dessert",
      des: "48 dessert",
    },
    {
      id: 4,
      image: "/images/home/category/img4.png",
      title: "Browse All",
      des: "255 Items",
    },
  ];

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Populer Categories</h2>
      </div>

      {/* items */}
      <div className="flex flex-col sm:flex-row flex-wrap  gap-8 justify-around text-center mt-12">
        
      {categoriesItems?.map((item)=>(
            <div className="shadow-lg rounded-[35px] bg-white py-6 px-5 w-72 mx-auto 
                cursor-pointer hover:translate-y-4 duration-300" key={item.id}>
               <div className="flex items-center justify-center w-full mx-auto">
               <img src={item.image} alt="" className="rounded-full bg-[#C1F1C6] p-6 w-28 h-28 " />
               </div>
               <div className=" mt-5 space-y-1">
                <h2 className="">{item.title}</h2>
                <p className="">({item.des})</p>
               </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
