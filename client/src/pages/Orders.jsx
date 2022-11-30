import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import AuthContext from "../context/authContext";

const Orders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/order/userOrder");
      setOrders(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {orders &&
        orders.map((item) => (
          <div className="CartContainer" key={item._id}>
            <div className="LeftContainer">
              <div className="MainTitle">ORDERS</div>
              {item.orderProducts.map((product) => (
                <div className="ItemContainer" key={product._id}>
                  <img className="Image" src={product.image} />
                  <div className="Title">{product.name}</div>
                  <div className="Price">{product.price}</div>
                  <div className="Qty">{product.quantity}</div>
                </div>
              ))}
            </div>
            <div className="RightContainer">
              <div className="Title">
                TOTAL {item.orderProducts.length} ITEMS
              </div>
              <div className="Price">{item.totalPrice}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Orders;
