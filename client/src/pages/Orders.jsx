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
      const { data } = await axios.get(`/order`);
      setOrders(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="OrderPageContainer">
      {orders &&
        orders.map((order) => (
          <div className="OrderContainer" key={order._id}>
            <div className="TotalContainer">
              <div className="Element">
                <div className="Title">Order Date</div>
                <div className="Value">
                  {moment(order.createdAt)
                    .utc()
                    .format("MMMM Do YYYY, h:mm:ss a") || ""}
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
                  <OrderObj item={item} key={item._id} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Orders;
