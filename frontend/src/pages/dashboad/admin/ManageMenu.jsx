import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider';
import { MdDelete, MdRestaurantMenu } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import loader from '/images/loader.gif';
import Swal from 'sweetalert2';
import axios from 'axios';
import From from '../../../component/menu/From';

const ManageMenu = () => {
    const {recepit,token,Backend_Url,fetchData} = useContext(AuthContext);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [menuType,setMenuType] = useState("");
    const [menuToUpdate, setMenuToUpdate] = useState(null); 
   


    const handleUpdateMenu=(item)=>{
      setMenuToUpdate(item)
      setMenuType("update")
    }

    const handleDeleteItem=async (id)=>{
      setLoading(true);
    try {
      const response = await axios.delete(
        `${Backend_Url}/api/menu/delete-menu/${id}`,
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
        fetchData();
      } else {
       setError(response.data.message || "User Not Found");
      }
    } catch (error) {
      console.log(error);
      
      setError(error.response?.data?.message || error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
    }
   
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <img src={loader} alt="Loading..." />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-screen">
         {error}
        </div>
      );
    }

    if (menuType==="update") {
      return (
        <div>
          <div className="text-2xl font-bold my-7 px-3">Update <span className="text-green ">Menu Item</span></div>
          <From item={menuToUpdate} menuType={menuType} setLoading={setLoading} setError={setError} error={error} setMenuType={setMenuType}/>
        </div>
      );
    }

    if (menuType==="add") {
      return (
        <div>
          <div className="text-2xl font-bold my-7 px-3">Add <span className="text-green ">Menu Item</span></div>
          <From menuType={menuType} setLoading={setLoading} setError={setError} error={error} setMenuType={setMenuType}/>
        </div>
      );
    }
  
    return (
      <div className="px-10 text-center">
        <div className="flex items-center justify-between m-4 w-full">
          <h4>All menus</h4>
          <div className="flex items-center justify-between gap-4">
            <button onClick={()=>setMenuType("add")} className="btn btn-success text-white "><MdRestaurantMenu className="text-lg"/>Add Menu</button>
          <h4>Total menus: {recepit.length}</h4>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-green text-white">
              <tr>
            
                <th>#</th>
                <th>Image</th>
                <th>Recipe</th>
                <th>Category</th>
                <th>Price</th>
                <th>Name</th>
                <th>Menu Created</th>
                <th>Update Menu</th>
                <th>Delete Menu</th>
              </tr>
            </thead>
            <tbody>
              {recepit.map((menuData, index) => (
                <tr key={menuData._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={menuData.photo} alt="menu Avatar" />
                      </div>
                    </div>
                  </td>
                  <td>{menuData.recipe || "Not Available"}</td>
                  <td>{menuData.category}</td>
                  <td>{menuData.price || "Not Available"}</td>
                  <td>{menuData.name || "Not Available"}</td>
                  <td>{new Date(menuData.createdAt).toLocaleString()}</td>
                  <td>
                      <MdModeEditOutline  onClick={() => handleUpdateMenu(menuData)}                     
                        className="bg-green text-3xl rounded-full text-white px-2 cursor-pointer"
                      />
                   
                  </td>
                  <td>
                    <button
                      onClick={()=>handleDeleteItem(menuData._id)}
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
export default ManageMenu
