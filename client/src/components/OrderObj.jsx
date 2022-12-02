import React from "react";

const OrderObj = ({ item }) => {
  return (
    <div>
      <div className="ItemContainer" key={item._id}>
        <img alt="..." className="Image" src={item.image}></img>
        <div className="ItemInfoContainer">
          <h1 className="Title">{item.name}</h1>
          <div className="Seller">Seller : {item.seller}</div>
          <div className="Price">Product Price : {Math.floor(item.price)}$</div>
          <div className="Price">KDV : {item.kdv}%</div>
          <div className="Price">
            Amount : {Math.floor(item.price * item.quantity)}$
          </div>
          <div className="QtyContainer">
            <div className="Title">Quantity :</div>
            <div className="Qty">{item.quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderObj;
