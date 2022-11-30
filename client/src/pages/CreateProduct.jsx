import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProductObj from "../components/AddProductObj";
import AuthContext from "../context/authContext";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState({});
  const { user, getUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "Sample name",
    price: 0,
    brand: "",
    description: "",
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    category: "",
    image: "/images/sample.jpg",
  });

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]:
        event.target.type === "number"
          ? Math.floor(Number(event.target.value))
          : event.target.value,
    }));
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClick = async () => {
    const imgUrl = await upload();
    try {
      await axios.post(`/product`, { ...inputs, image: "/images/" + imgUrl });
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const elements = [
    {
      id: "name",
      placeholder: "Name",
      type: "text",
    },
    {
      id: "price",
      placeholder: "Price",
      type: "number",
    },
    {
      id: "brand",
      placeholder: "Brand",
      type: "text",
    },
    {
      id: "description",
      placeholder: "Description",
      type: "text",
    },
    {
      id: "countInStock",
      placeholder: "countInStock",
      type: "number",
    },
    {
      id: "category",
      placeholder: "Category",
      type: "text",
    },
  ];

  return (
    <div className="CreateProductContainer">
      <div className="ElementContainer">
        {elements.map((item, index) => (
          <div className="Element" key={index}>
            <AddProductObj item={item} handleChange={handleChange} />
          </div>
        ))}
      </div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="submit" onClick={handleClick}>
        Publish
      </button>
    </div>
  );
};

export default CreateProduct;
