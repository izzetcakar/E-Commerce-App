import React from "react";
import { useEffect } from "react";

const ChangeProductItem = ({ item, handleChange }) => {
  return (
    <div>
      <div className="Title">{item.title}</div>
      <input
        type={item.type}
        id={item.id}
        placeholder={item.placeholder}
        className="Value"
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default ChangeProductItem;
