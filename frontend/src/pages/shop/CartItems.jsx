import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { userCartDetail, handleUpdateToCart, handleDeleteToCart, recepit,user,countAddToCart,getCardAmount } = useContext(AuthContext);
  const [input, setInput] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const navigate=useNavigate()
  

  // Effect to populate cartDetails based on userCartDetail and recepit
  useEffect(() => {
    if (recepit.length > 0) {
      let cartTamp = [];
      for (const itemId in userCartDetail) {
        const quantity = userCartDetail[itemId];
        if (quantity > 0) {
          cartTamp.push({
            _id: itemId,
            quantity: quantity
          });
        }
      }
      setCartDetails(cartTamp);
    }
  }, [userCartDetail, recepit]);

  // Initialize the input state with quantities when the cart data is loaded
  useEffect(() => {
    if (cartDetails.length > 0) {
      setInput(cartDetails.map(item => item.quantity));
    }
  }, [cartDetails]);

  //function for increasing cart
  const handleIncrease = (index) => {
    const newInput = [...input];
    newInput[index] = newInput[index] + 1;
    setInput(newInput);
    handleUpdateToCart(cartDetails[index]._id, newInput[index]);
  };

  //function for Decreasing cart
  const handleDecrease = (index) => {
    const newInput = [...input];
    if (newInput[index] > 1) {
      newInput[index] = newInput[index] - 1;
      setInput(newInput);
      handleUpdateToCart(cartDetails[index]._id, newInput[index]);
    }
  };

   //function for update Quantity in cart
  const handleQuantityChange = (index, value) => {
    const newInput = [...input];
    newInput[index] = Math.max(1, Number(value)); // Prevent quantity from going below 1
    setInput(newInput);
    handleUpdateToCart(cartDetails[index]._id, newInput[index]);
  };

  const handleDeleteCart=(itemId)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You went to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteToCart(itemId)
      }
    });
  }

  return (
    <div className="section-container">
      <div className="flex items-center justify-center py-36 lg:py-24 gap-8 text-center">
        <div className="space-y-7 px-4">
          <h1 className="md:text-4xl text-5xl font-extrabold md:leading-snug leading-snug">
            Items Added To The <span className="text-green">Cart</span>
          </h1>
        </div>
      </div>

    {cartDetails.length===0 ? (
      <div className="flex items-center justify-center font-semibold text-2xl mb-6">Your   &nbsp; <span className='text-green'> Cart Is Empty !</span></div>
    ):(<>
      <div className="overflow-x-auto mb-20">
      <table className="table">
        <thead className="bg-green text-white rounded-sm">
          <tr>
            <th>No.</th>
            <th>Food</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.map((cartProduct, index) => {
            const userCartData = recepit.find((item) => item._id === cartProduct._id);
            if (!userCartData) return null; 
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={userCartData.photo} alt="Food Item" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{userCartData.name}</td>
                <td className="w-20">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      className="btn rounded-xl"
                      onClick={() => handleDecrease(index)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={input[index] || 1}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="w-6 max-w-xs text-center"
                    />
                    <button
                      className="btn rounded-xl"
                      onClick={() => handleIncrease(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>$ {(userCartData.price * input[index]).toFixed(2)}</td>
                <th>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteCart(userCartData._id)}
                  >
                    <RiDeleteBin6Line className="text-white text-lg" />
                  </button>
                </th>
              </tr>
            );
           
          })}
        </tbody>
      </table>
    </div>
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
      <div className="md:w-1/2 space-y-3">
      <h3 className="font-medium"> Customer Details</h3>
      <p className="">Name: {user.name}</p>
      <p className="">Email: {user.email}</p>
      <p className="">Mobile No.: {user.phone === null ? "Not Available" : user.phone}</p>
      </div>
      <div className="md:w-1/2 space-y-3 mt-9 md:mt-0">
      <h3 className="font-medium"> Shopping Details</h3>
      <p className="">Total Items: {countAddToCart()}</p>
      <p className="">Total Price: ₹ {getCardAmount().toFixed(2)}</p>
      <button onClick={()=>navigate("/place-order")} className="btn bg-green text-white">Place Your Order</button>
      </div>
    </div>
    </>
    )}
     

    
    </div>
  );
};

export default CartItems;
