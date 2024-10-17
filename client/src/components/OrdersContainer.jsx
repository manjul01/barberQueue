import React from 'react';

import SingleOrder from './SingleOrder';

const OrdersContainer = (props) => {
  const orders = props.orders;
  const currUser = props.currUser
  const title = props.title;
  const shopOwner = currUser.shopOwner;
  console.log("curruser in oc" ,currUser)
  return (
    <div className="w-full sm:w-1/2 p-3">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="space-y-1">
        {orders.map((order) => (
          <SingleOrder key={order._id} orderId={order._id} name={order.username} dateString={order.createdAt} shopOwner={shopOwner}/>
        ))}
      </div>
    </div>
  );
};

export default OrdersContainer;
