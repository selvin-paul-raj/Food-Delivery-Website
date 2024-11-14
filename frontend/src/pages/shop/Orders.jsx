import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Orders = () => {
  const {currency,ordersData, fetchOrders } = useContext(AuthContext);

  return (
    <div className='section-container py-16'>
      <div className="text-xl sm:text-2xl my-3">
        <h1 className="r font-semibold">ORDERS <span className="text-green">DETAILS</span> </h1>
        </div>
      <div>
        {ordersData.map((food, index) => (
          <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <img src={food.photo} className='w-16 sm:w-20' alt="" />
              <div className="">
                <p className='sm:text-base font-medium'>{food.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                  <p className='text-lg'>{currency}{food.price}</p>
                  <p>Quantity: {food.quantity}</p>
                 
                </div>
                <p>Date: <span className='text-gray-400'>{new Date(food.date).toDateString()}</span></p>
                <p>Payment: <span className='text-gray-400'>{food.paymentMethod}</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className='min-w-2 h-2 rounded-full bg-green'></p>
                <p className='text-sm md:text-base'>{food.status}</p>
              </div>
              <button onClick={fetchOrders} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
