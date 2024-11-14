// components/PlaceOrder.jsx

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { user, getCardAmount, setUserCartDetail, recepit, userCartDetail, delivery_fee, token, Backend_Url,fetchOrders } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Effect to set initial form data based on user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItem = Object.entries(userCartDetail).map(([productId, quantity]) => {
        const productInfo = structuredClone(
          recepit.find((product) => product._id === productId)
        );
        if (productInfo) {
          productInfo.quantity = quantity; // Add quantity to product info
        }
        return productInfo;
      }).filter(item => item); // Filter out any undefined items

      let orderData = {
        address: formData,
        amount: getCardAmount() + delivery_fee,
        items: orderItem,
      };

      if (method === "cod") {
        try {
          const response = await axios.post(
            `${Backend_Url}/api/order/place`,
            orderData,
            {
              headers: { 
                  Authorization: `Bearer ${token}` 
              }
            }
          );
          console.log(response);
          if (response.data.success) {
            setUserCartDetail([{}]); 
            fetchOrders()
            navigate("/order");
          } else {
            console.log(response);
            
            toast.error(response.data.msg);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          const response = await axios.post(
            `${Backend_Url}/api/order/stripe`,
            orderData,
            {
              headers: { 
                  Authorization: `Bearer ${token}` 
              }
            }
          );
           
            
          if (response.data.success) {
             const { session_url } = response.data;
             window.location.replace(session_url);
             setUserCartDetail([{}]); 
            fetchOrders()
          } else {
            toast.error(response.data.msg);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex items-center justify-center gap-4 pt-5 sm:pt-14 border-t section-container"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <h1 className="text-center font-semibold">DELIVERY <span className="text-green">INFORMATION</span> </h1>
        </div>
        <input
          name="name" // Changed to match formData structure
          value={formData.name}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Enter your Name"
          required
        />
        <input
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="email" // Change type to 'email' for validation
          placeholder="Enter Email Address"
          required
        />
        <input
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter Street"
          required
        />
        <input
          name="city"
          value={formData.city}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter City"
          required
        />
        <input
          name="state"
          value={formData.state}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter State"
          required
        />
        <input
          name="zipcode"
          value={formData.zipcode}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter Zipcode"
          required
        />
        <input
          name="country"
          value={formData.country}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter Country"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter Phone Number"
          required
        />
        <div className="flex justify-center gap-7 py-4">
          <div className="flex items-center justify-between gap-3">
            <input type="radio" name="radio-1" className="radio radio-success" onClick={() => setMethod("cod")} />
            <span className="label-text">Cash On Delivery</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <input type="radio" name="radio-1" className="radio radio-success" onClick={() => setMethod("stripe")} />
            <span className="label-text">Card Payment</span>
          </div>
        </div>
        <button type="submit" className="btn bg-green">Submit</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
