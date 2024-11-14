import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import parcel_icon from "/parcel_icon.svg"

const AdminOrders = () => {
    const {recepit,token,Backend_Url,currency} = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    const ordersList=useCallback(async()=>{
        if (!token) {
          return null
        }
        try {
          const response =await axios.post(Backend_Url+"/api/order/list",{},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          if (response.data.success) {
            setOrders(response.data.orders.reverse())
          }else{
            toast.error(response.data.message)
          }
          
        } catch (error) {
          toast.error(error.message)  
        }
      },[Backend_Url, token])
  
    const updateStatus=async (e,orderId)=>{
      try {
        const response =await axios.post(Backend_Url+"/api/order/status",{orderId,status:e.target.value},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        if (response.data.success) {
          await ordersList();
        }
      } catch (error) {
        console.log(error);
        
        toast.error(error.message)  
      }
    }
  
    useEffect(()=>{
      ordersList()
    },[ordersList, token])
  
    return (
      <div className='px-10'>
        <div className="flex items-center justify-between m-4 w-full font-semibold"><h4>All Orders of User</h4>
        </div>
        <div>
          {orders.map((order,index)=>(
           
              <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
            gap-3 items-start border-2 border-blue-500 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
              <img className='w-12' src={parcel_icon} alt="" />
              <div>
              {order.items.map((item,index)=>{
                if (index === order.items.length-1 ) {
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} </p>
                }else{
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} </p>
                }
              })}
              
              <p className="mt-3 mb-2 font-medium">{order.address.name }</p>
              <div>
                <p>{order.address.street + "," }</p>
                <p>{ order.address.city + "," + order.address.state + "," +  order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p>Phone No. {order.address.phone}</p>
              </div>
            <div className="">
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment? "Done":"Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{" "+order.amount}</p>
           <select onChange={(e)=>updateStatus(e,order._id)} value={order.status} className='p-2 font-semibold border border-green'>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
           </select>
           </div>
          ))}
        </div>
      </div>
    )
}

export default AdminOrders
