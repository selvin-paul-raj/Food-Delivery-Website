import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "/logo.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import LoginSingup from "../model/LoginSingup";
import { AuthContext } from '../../context/AuthProvider'
import Profile from "../Profile/Profile";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
 
  const [isSticky, setIsSticky] = useState(false);
  const dropdownMenuRef = useRef(null);
  const dropdownServicesRef = useRef(null);
  const {query,setQuery,countAddToCart,setIsModalOpen,token,isSearchInput,handleSearch} =useContext(AuthContext)  
  const navigate=useNavigate()

  const handleToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  //function for closing dropdown
  useEffect(() => {
    //when you click ouside menu or services option box it will close option box
    const handleOutside = (e) => {
      if (
        (dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target)) &&
        (dropdownServicesRef.current && !dropdownServicesRef.current.contains(e.target)) &&
        !e.target.closest('.navbar') // Check if it's not within the navbar
      ) {
        setOpenDropdown(null);
      }
    };
  
    document.addEventListener("mousedown", handleOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [dropdownMenuRef, dropdownServicesRef]);

  //handle dropdown of menu and sevrice
  const handleonclick=()=>{
   return setOpenDropdown(null)
  }

 //list of nav link
  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li ref={dropdownMenuRef} tabIndex={0} className="relative">
  <a
    role="button"
    onClick={() => handleToggle("menu")}
    className="cursor-pointer"
  >
    Menu {openDropdown === "menu" ? <FaAngleUp /> : <FaAngleDown />}
  </a>
  {openDropdown === "menu" && (
    <ul className="lg:absolute lg:left-0 lg:top-8 lg:mt-2 w-48 bg-base-100 rounded-lg lg:shadow-lg p-2 z-10">
      <li>
        <Link onClick={handleonclick} 
         to={"/menu"}
        >
          All
        </Link>
      </li>
      <li>
         <Link onClick={handleonclick} 
         to={"/fav-menu"}
        >Favorite Menu</Link>
      </li>
     
    </ul>
  )}
</li>
      <li ref={dropdownServicesRef} tabIndex={0} className="relative">
        <button
          role="button"
          onClick={() => handleToggle("services")}
          className="cursor-pointer"
          aria-haspopup="true"
          aria-expanded={openDropdown === "services"}
        >
          Services{" "}
          {openDropdown === "services" ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        {openDropdown === "services" && (
          <ul className="lg:absolute lg:left-0  lg:top-8 lg:mt-2 w-48 bg-base-100 rounded-lg lg:shadow-lg p-2 z-10 ">
            <li>
              <Link to={"/order"} onClick={handleonclick}>
              <button className="whitespace-nowrap">Orders</button>
              </Link>
            </li>
           
          </ul>
        )}
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );

  useEffect(()=>{
    //stichy header fuction
   const handleNav=()=>{
    const offset=window.scrollY
    if (offset > 0) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
   }
    window.addEventListener("scroll",handleNav)
    return ()=>{window.removeEventListener("scroll",handleNav)}
  },[isSticky])

 useEffect(() => {
   if(isSearchInput){
    navigate("/menu")
   }
 
 }, [isSearchInput, navigate])
 
  

 


  return (
    <header className={`${isSticky ? "fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out shadow-md bg-base-100 z-50":""}`}>
      <div className='navbar section-container'>
        <div className="navbar-start">
           {/* option for small screen */}
          <div className="dropdown">
           
            <div tabIndex={0} role="button" className="btn  btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>

          </div>
          {/* logo */}
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex items-center gap-1">

      
          <div className="px-0">
          <div className="form-control overflow-hidden ">
          <input type="text"  value={query}  onChange={(e) => setQuery(e.target.value)} placeholder="Search" className={`input input-bordered w-full md:w-auto duration-500 ${isSearchInput ? " translate-x-0" :"translate-x-96"}`} />
           </div>
          </div>
      

          {/* Serach Button */}
          <button tabIndex={0} className="btn btn-ghost btn-circle flex" onClick={handleSearch}>
         
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            
          </button>

          {/* cart button */}
         <Link to={"/cart-items"}>
         <label tabIndex={0} className="dropdown dropdown-end flex items-center justify-center  ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{countAddToCart()}</span>
              </div>
            </div>
          </label>
         </Link>

      
         {token ? (
            <Profile />
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-green flex items-center gap-2 rounded-full text-white px-6"
              aria-label="Login Button"
            >
              <FaUserAlt /> Login
            </button>
          )}
          <LoginSingup/>
        </div>
      </div>
    </header>
  );

};

export default Navbar;
