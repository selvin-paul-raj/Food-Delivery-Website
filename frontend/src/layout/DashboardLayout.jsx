import React, { useContext, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUsers, FaPlusCircle, FaEdit,FaHome  } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaBagShopping } from "react-icons/fa6";
import logo from "/logo.png";
import { AuthContext } from "../context/AuthProvider";
import loader from '/images/loader.gif';
import { CiDeliveryTruck } from "react-icons/ci";
import { RiCustomerService2Fill } from "react-icons/ri";


const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
const navigate=useNavigate()
const drawer=useRef(null)
  const { loading} = useContext(AuthContext);
  
  // Check if user is loading or an empty object
  if (loading) {
   return (
       <div className="flex items-center justify-center h-screen">
           <img src={loader} alt="Loading..." />
       </div>
   );
  }


  return (
    <div className="">
      <div className={`drawer lg:drawer-open ${isSidebarOpen ? 'drawer-open' : ''}`}>
      <input 
          id="my-drawer-2" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={isSidebarOpen}
          onChange={() => setSidebarOpen(!isSidebarOpen)}
        />
        <div className="drawer-content flex flex-col  ">
          {/* Page content here */}
    
        <div className="flex items-center justify-between mx-4">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden my-3"
        >
          <MdOutlineDashboardCustomize className="text-2xl" />
        </label>
        <button className="btn bg-green rounded-full text-white px-6  sm:hidden">
          Logout
        </button>
        </div>
          <div className="mt-5 md:mt-2 mx-4 sm  sm:items-start sm:justify-start">
          <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
         
         <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <Link className="flex items-center mb-3" to={"/dashboard"}>
                <img className="w-20" src={logo} alt="logo" />
                <span className="badge badge-primary">Admin</span>
              </Link>
            </li>
            <li>
              <Link className="mt-4" to={"/dashboard"} onClick={() => setSidebarOpen(false)}>
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/list-order"} onClick={() => setSidebarOpen(false)}>
                <FaBagShopping />
                Manage Orders
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/list-menu"} onClick={() => setSidebarOpen(false)}>
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/users"} onClick={() => setSidebarOpen(false)}>
                <FaUsers />
                All Users
              </Link>
            </li>
            <hr className="my-4 w-full" />
            <li>
              <Link to={"/"} onClick={() => setSidebarOpen(false)}>
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link to={"/menu"} onClick={() => setSidebarOpen(false)}>
                <TiThMenu />
                Menu
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={() => setSidebarOpen(false)}>
                <RiCustomerService2Fill />
                Customer Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
