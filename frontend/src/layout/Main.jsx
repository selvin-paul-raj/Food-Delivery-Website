// Main.js
import React, { useContext } from 'react';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import "../App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import loader from '/images/loader.gif';

const Main = () => {

  const { loading} = useContext(AuthContext);
   if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <img src={loader} alt="Loading..." />
        </div>
    );
}
  return (
    <div className='bg-gradient-to-r from-[#FAFAFA] to-[rgb(252,252,252)]'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
