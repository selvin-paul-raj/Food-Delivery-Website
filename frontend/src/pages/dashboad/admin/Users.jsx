import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';
import loader from '/images/loader.gif';
import Swal from 'sweetalert2';

const Users = () => {
  const { token, Backend_Url, user } = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);
  const [allFilterUser, setAllFilterUser] = useState([]);
  const [loading,setLoading] = useState(false);

  const toggleRole = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${Backend_Url}/api/user/update-role/${id}`,
        {},
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
        fetchAllUser(); // Refresh users after role change
      } else {
        toast.error(response.data.message || "User Not Found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Backend_Url}/api/user/all-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setAllUser(response.data.data);
      } else {
        toast.error(response.data.message || "User Not Found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [Backend_Url, setLoading, token]);

  useEffect((()=>{
    if(allUser){
      const filterUser=allUser.filter((alluser) => alluser._id !== user._id)
     setAllFilterUser(filterUser)      
    }
  }),[allUser, user._id])

    

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
        fetchAllUser();
      } else {
        toast.error(response.data.message || "User Not Found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    if (user?.role !== "admin") return;
    fetchAllUser();
  }, [fetchAllUser, user?.role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={loader} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="px-10">
      <div className="flex items-center justify-between m-4 w-full">
        <h4>All Users</h4>
        <h4>Total Users: {allUser.length}</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-green text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Gender</th>
              <th>Account Created</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allFilterUser.map((userData, index) => (
              <tr key={userData._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={userData.photo} alt="User Avatar" />
                    </div>
                  </div>
                </td>
                <td>{userData.name || "Not Available"}</td>
                <td>{userData.email}</td>
                <td>{userData.phone || "Not Available"}</td>
                <td>{userData.gender || "Not Available"}</td>
                <td>{new Date(userData.createdAt).toLocaleString()}</td>
                <td>
                  {userData.role === "user" ? (
                    <FaUsers
                      onClick={() => toggleRole(userData._id)}
                      className="bg-blue-700 rounded-full text-white text-3xl px-2 py-2 cursor-pointer"
                    />
                  ) : (
                    <RiAdminFill
                      onClick={() => toggleRole(userData._id)}
                      className="bg-red text-3xl rounded-full text-white px-2 cursor-pointer"
                    />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(userData._id)}
                   className="btn bg-red text-white text-xl">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
