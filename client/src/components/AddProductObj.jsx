import React from "react";
import { useEffect } from "react";

const AddProductObj = ({ item, handleChange }) => {
  return (
    <div>
      <input
        type={item.type}
        id={item.id}
        placeholder={item.placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddProductObj;
