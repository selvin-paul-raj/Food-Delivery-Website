import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/AuthProvider";
import Card from '../../component/card/Card';
import Pagination from '../../component/Pagination/Pagination';

const FavoriteMenu = () => {
    const { favorite } = useContext(AuthContext)
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12); 
    const {recepit}=useContext(AuthContext)
   
  
  
  
  
   
   
  
    //handing sort
    const handleSortChange = (e) => {
      setSortOption(e.target.value);
    };
  
      // Paginate items
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const currentItems = favorite.slice(indexOfFirstItem, indexOfLastItem);
  
    const handlePagination = (pageNumber) => {
      setCurrentPage (pageNumber);
  };
  return (
    <div>
    <div className="section-container">
      <div className="flex items-center justify-center text-center py-12 lg:py-24 gap-8 ">
        {/* Text Section */}
        <div className="space-y-7 px-4">
          <h1 className="text-4xl md:text-5xl font-bold md:leading-snug leading-snug">
          Embrace Your Cherished Selections{" "}
            <span className="text-green">Food</span>
          </h1>
          <p className="lg:text-xl text-[#4A4A4A] text-lg">
          Where Each Item Captures Moments of Delight and Personal Connection
          </p>
        </div>
      </div>

    {favorite.length===0 ? (
        <div className="flex items-center justify-center font-semibold text-2xl">Your Favorite  &nbsp; <span className='text-green'> Cart Is Empty !</span></div>
    ):(
      <div className="grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-x-8 gap-y-16 pb-12">
      {currentItems.map((item, i) => (
        <Card item={item} key={i} />
      ))}
    </div>
    )}
      

      {/* pagination */}
      <div className="">
      <Pagination
      length={favorite.length}
      postsPerPage={postsPerPage}
      handlePagination={handlePagination}
      currentPage={currentPage}
  />
      </div>
    </div>
  </div>
  )
}

export default FavoriteMenu
