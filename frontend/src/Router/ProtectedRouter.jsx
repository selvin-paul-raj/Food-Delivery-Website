/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import LoginSingup from '../component/model/LoginSingup';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRouter = ({ children }) => {
  const { token,setIsModalOpen,setModel } = useContext(AuthContext);  
  useEffect(() => {
    if (!token) {
      setModel("login")
      setIsModalOpen(true)
    }
  }, [token, setIsModalOpen, setModel]);

  if (token) {
    return children;
  } else {
    return (
      <div className="section-container">
        <h1 className="text-center lg:text-xl font-bold text-green">Please Login First!</h1>
        <LoginSingup/>
      </div>
    );
  }
};

export default ProtectedRouter;


