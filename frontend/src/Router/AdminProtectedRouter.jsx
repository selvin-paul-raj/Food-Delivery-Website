/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import LoginSingup from '../component/model/LoginSingup';
import { AuthContext } from '../context/AuthProvider';

const AdminProtectedRouter = ({ children }) => {
  const { user, setIsModalOpen, setModel } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in:", user);
      setModel("login");
      setIsModalOpen(true);
    }
  }, [setIsModalOpen, setModel, user]);

  if (user?.role === "admin") {
    return children;
  }

  return (
    <div className="section-container">
      <h1 className="text-center lg:text-xl font-bold text-green h-screen flex items-center justify-center">
        You are not allowed to access this page!
      </h1>
      <LoginSingup />
    </div>
  );
};

export default AdminProtectedRouter;
