import React from "react";

const AddProductObj = ({ item, handleChange }) => {
  return (
    <div>
      <div className="Title">{item.title}</div>
      <input
        type={item.type}
        id={item.id}
        placeholder={item.placeholder}
        onChange={handleChange}
        className="Value"
      />
    </div>
  );
};

export default AddProductObj;
