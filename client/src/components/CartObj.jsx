import React from "react";
import Quantity from "./Quantity";

const CartObj = ({ item, quantity, addProduct, removeProduct }) => {
  return (
    <div key={item._id}>
      <div className="ItemContainer" key={item._id}>
        <img alt="..." className="Image" src={item.image}></img>
        <div className="ItemInfoContainer">
          <h1 className="Title">{item.name}</h1>
          <div className="Seller">Seller : {item.seller}</div>
          <div className="Price">{item.description}</div>
          <div className="Price">Product Price : {Math.floor(item.price)}$</div>
          <div className="Price">KDV : {item.kdv}%</div>
          <div className="Price">
            Amount :{" "}
            {item.price * quantity + (item.price / 100) * item.kdv * quantity}$
          </div>
          <Quantity
            quantity={quantity}
            addProduct={addProduct}
            removeProduct={removeProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default CartObj;
