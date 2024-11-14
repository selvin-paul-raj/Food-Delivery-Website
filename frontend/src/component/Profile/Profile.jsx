import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
const Profile = () => {
    const { token, Backend_Url, user,setLoading,setIsModalOpen,logout,dispatch } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
 
    const from = location.state?.from?.pathname || "/";
    // Function for logging out the user
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout successfully");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    // Function to navigate to different pages
    const handlePages = (url) => {
        if (url) {
            navigate(url);
            document.getElementById("my-drawer-4").checked = false; 
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        try {
          const response = await axios.delete(
            `${Backend_Url}/api/user/delete-user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
        
          
          if (response.data.success) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/")
            setIsModalOpen(true)
            localStorage.removeItem("token")
            dispatch({
                type:"LOGOUT"
              })
          } else {
            toast.error(response.data.message || "User Not Found");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="">
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className='drawer-button btn btn-ghost btn-circle avatar'>
                        <div className="w-10 rounded-full">
                           {user &&  <img
                                alt="Profile"
                                referrerPolicy="no-referrer"
                                src={`${user.photo}`}/> 
                            }
                        </div>
                    </label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><button onClick={() => handlePages("/update-profile")}>Profile</button></li>
                        <li><button onClick={() => handlePages("/order")}>Orders</button></li>
                        <li><button onClick={() => deleteUser(user._id)}>Account Delete</button></li>
                       {user && user.role === "admin" &&  <li><button onClick={() => handlePages("/dashboard")}>Admin Dashboard</button></li>}
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
