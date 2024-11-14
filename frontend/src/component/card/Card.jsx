/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

const Card = ({ item }) => {
  const [isHeart, setIsHeart] = useState(false);
  const { handleAddToCart,  favorite, deleteToFav,addToFav } = useContext(AuthContext);
  const id = item._id;

  // Check if the current item is in favorites and update isHeart accordingly
  useEffect(() => {
    const isFavorite = favorite.some(fav => fav._id === id);
    setIsHeart(isFavorite);
  }, [favorite, id]);
 

  const handleFavToggle = (id) => {
    if (isHeart) {
      setIsHeart(false)
      deleteToFav(id); // If already a favorite, remove it
    } else {
      setIsHeart(true)
      addToFav(id); // If not a favorite, add it
    }
  };

  return (
    <div className="mx-6">
      <div className="card rounded-2xl bg-base-100 shadow-xl relative">
        <div className={`absolute heartStar top-0 right-0 bg-green px-4 py-4 rating gap-1 ${isHeart ? "text-rose-500" : "text-white"}`}>
          <IoMdHeart className="h-5 w-5 cursor-pointer" onClick={()=>handleFavToggle(item._id)} />
        </div>
        <Link to={`/menu/${item._id}`}>
          <figure>
            <img src={item.photo} className="hover:scale-105 transition-all duration-300 2xl:h-56 lg:h-48 mt-10" alt={item.name} />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${item._id}`}>
            <h2 className="card-title whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{item.name}</h2>
          </Link>
          <p>Description of the item</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold"><span className="text-red text-sm">$</span>{item.price}</h5>
            <button className="btn bg-green text-white" onClick={() => handleAddToCart(item)}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
