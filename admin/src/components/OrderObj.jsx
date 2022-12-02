import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const OrderObj = ({ item, changeQty, orderId }) => {
  return (
    <div>
      <div className="ItemContainer" key={item._id}>
        <img alt="..." className="Image" src={item.image}></img>
        <div className="ItemInfoContainer">
          <h1 className="Title">{item.name}</h1>
          <div className="Seller">Seller : {item.seller}</div>
          <div className="Price">Product Price : {Math.floor(item.price)}$</div>
          <div className="Price">
            Amount : {Math.floor(item.price * item.quantity)}$
          </div>
          <div className="QtyContainer">
            <div className="Title">Quantity :</div>
            <RemoveCircleIcon
              className="Icon"
              onClick={() => changeQty(orderId, item, -0.5)}
            />
            <div className="Qty">{item.quantity}</div>
            <AddCircleIcon
              className="Icon"
              onClick={() => changeQty(orderId, item, 0.5)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderObj;
