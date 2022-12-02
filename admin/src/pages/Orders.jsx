import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderObj from "../components/OrderObj";
import AuthContext from "../context/authContext";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { search } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(`/order/${id}`);
      setOrders(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const changeQty = (orderId, product, qty) => {
    let newOrder = orders.find((item) => item._id === orderId);

    for (let i = 0; i < newOrder.orderProducts.length; i++) {
      if (newOrder.orderProducts[i]._id === product._id) {
        if ((newOrder.orderProducts[i].quantity += qty) < 1) {
          newOrder.orderProducts.splice(i, 1);
          i++;
        } else {
          newOrder.orderProducts[i].quantity += qty;
          newOrder.totalPrice =
            product.price * newOrder.orderProducts[i].quantity;
        }
      }
    }

    if (newOrder.orderProducts.length > 0) {
      return updateOrder(newOrder, orderId);
    } else {
      return deleteOrder(orderId);
    }
  };

  const updateOrder = async (updatedOrder, id) => {
    try {
      await axios.put(`/order/${id}`, updatedOrder);
      getUserOrders();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/order/${id}`);
      getUserOrders();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="OrderPageContainer">
      {orders &&
        orders.map((order) => (
          <div className="OrderContainer" key={order._id}>
            <div className="EditItem" onClick={() => deleteOrder(order._id)}>
              Delete
            </div>
            <div className="TotalContainer">
              <div className="Element">
                <div className="Title">Order Date</div>
                <div className="Value">
                  {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a") ||
                    ""}
                </div>
              </div>
              <div className="Element">
                <div className="Title">Total Price</div>
                <div className="Value">{order.totalPrice}$</div>
              </div>
            </div>
            <div className="CartContainer">
              {order.orderProducts
                .filter((item) => {
                  if (search === "") return item;
                  else if (
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                    return item;
                })
                .map((item) => (
                  <OrderObj
                    item={item}
                    changeQty={changeQty}
                    key={item._id}
                    orderId={order._id}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
