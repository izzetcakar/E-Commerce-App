import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Quantity = ({ quantity, addProduct, removeProduct }) => {
  return (
    <div className="QtyContainer">
      <div className="Title">Quantity :</div>
      <RemoveCircleIcon className="Icon" onClick={() => removeProduct()} />
      <div className="Qty">{quantity}</div>
      <AddCircleIcon className="Icon" onClick={() => addProduct()} />
    </div>
  );
};

export default Quantity;
