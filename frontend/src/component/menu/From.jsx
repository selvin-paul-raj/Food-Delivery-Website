/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdRestaurantMenu } from "react-icons/md";
import loader from "/images/loader.gif";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
const From = ({
  item = {},
  menuType,
  setLoading,
  setError,
  loading,
  error,
  setMenuType,
}) => {
  const { _id, name, category, photo, price, recipe } = item;
  const { user, token, Backend_Url,fetchData, } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 

  const addMenuFrom = async (data) => {
    if (user.role === "admin") {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("recipe", data.recipe);
        formData.append("price", data.price);
        formData.append("category", data.category);
        if (data.photo[0]) {
          formData.append("photo", data.photo[0]);
        }

        const response = await axios.post(
          `${Backend_Url}/api/menu/add-menu`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

      

        if (response.data.success) {
          reset();
          setMenuType("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          fetchData()
        } else {
          setError(response.data.message || "failed");
        }
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const updateMenuForm = async (data) => {
    if (user.role !== "admin") {
      return setError("Unauthorized: Admin access required");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("recipe", data.recipe);
      formData.append("price", data.price);
      formData.append("category", data.category);

     
      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }

      
      const response = await axios.put(
        `${Backend_Url}/api/menu/update-menu/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      

      if (response.data.success) {
        reset();
        setMenuType("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData()
      } else {
        setError(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={loader} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={
          menuType === "add"
            ? handleSubmit(addMenuFrom)
            : handleSubmit(updateMenuForm)
        }
      >
        <div className="w-full px-3 mb-6">
          <p className="mb-5 font-semibold">
            Recipe Name <span className="text-red">*</span>
          </p>
          {errors.name && (
            <p className="text-red text-sm mb-2">{errors.name.message}</p>
          )}
          <input
            type="text"
            className="input w-full input-bordered"
            {...register("name", { required: "Recipe Name is required" })}
            defaultValue={menuType === "update" ? name : ""}
          />
        </div>
        <div className="flex justify-start items-start w-full  mb-6">
          <div className="w-1/2 px-3">
            <p className="mb-5 font-semibold">
              Category <span className="text-red">*</span>
            </p>
            {errors.category && (
              <p className="text-red text-sm mb-2">{errors.category.message}</p>
            )}
            
            <select className="select select-bordered w-full"  {...register("category", { required: "Category is required" })} defaultValue={menuType === "update" ? category : ""}>
              <option disabled value={""}>Select Category</option>
              <option value={"Pizza"}>Pizza</option>
              <option value={"Appetizers"}>Appetizers</option>
              <option value={"Soups"}>Soups</option>
              <option value={"Pasta"}>Pasta</option>
              <option value={"Main Course"}>Main Course</option>
              <option value={"Vegetarian"}>Vegetarian</option>
              <option value={"Burgers"}>Burgers</option>
              <option value={"Salads"}>Salads</option>
              
             
            </select>
          </div>
          <div className="w-1/2  px-3">
            <p className="mb-5 font-semibold">
              Price <span className="text-red">*</span>
            </p>
            {errors.price && (
              <p className="text-red text-sm mb-2">{errors.price.message}</p>
            )}
            <input
              type="number"
              className="input w-full input-bordered"
              {...register("price", { required: "Price is required" })}
              defaultValue={menuType === "update" ? price : ""}
            />
          </div>
        </div>
        <div className="w-full px-3 mb-6">
          <p className="mb-5 font-semibold">
            Recipe Details <span className="text-red">*</span>
          </p>
          {errors.recipe && (
            <p className="text-red text-sm mb-2">{errors.recipe.message}</p>
          )}
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Bio"
            {...register("recipe", { required: "Recipe Details is required" })}
            defaultValue={menuType === "update" ? recipe : ""}
          ></textarea>
        </div>
        <div className="w-full px-3 mb-6">
          <p className="mb-5 font-semibold">
            Recipe Image <span className="text-red">*</span>
          </p>
          {errors.photo && (
            <p className="text-red text-sm mb-2">{errors.photo.message}</p>
          )}
          <div className="flex items-center justify-between gap-3">
          {photo && (
              <img src={photo} alt="Preview" className="w-12 h-12" />
            )}
          <input
            type="file"
            className="file-input file-input-bordered w-full "
            {...register("photo", { required: menuType === "add" ? "Recipe Image is required" : false })}                                                                                                                                                                                                       
          />
          </div>
        </div>
        {error && (
          <p className="text-red font-semibold text-sm mt-3">{error}</p>
        )}
        <div className="px-3 flex justify-start items-center gap-4">
          <button
            type="submit"
            className="btn btn-success text-white"
            aria-label={menuType === "add" ? "Add Menu" : "Update Menu"}
          >
            <MdRestaurantMenu className="text-lg" />
            {menuType === "add" ? "Add Menu" : "Update Menu"}
          </button>
          <button
            onClick={() => setMenuType("")}
            className="btn btn-success text-white "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default From;
