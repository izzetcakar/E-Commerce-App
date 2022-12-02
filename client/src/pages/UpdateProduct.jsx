import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import AddProductObj from "../components/AddProductObj";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const { data } = await axios(`/product/${id}`);
      setProduct((prev) => data);
      return true;
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleChange = (event) => {
    setProduct((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const updateProduct = async (product, id) => {
    try {
      await axios.put(`/product/${id}`, product);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const elements = [
    {
      id: "name",
      title: "Name",
      type: "text",
      placeholder: product.name,
    },
    {
      id: "price",
      title: "Price",
      type: "number",
      placeholder: product.price,
    },
    {
      id: "kdv",
      title: "KDV",
      type: "number",
      placeholder: `${product.kdv}%`,
    },
    {
      id: "description",
      title: "Description",
      type: "text",
      placeholder: product.description,
    },
    {
      id: "countInStock",
      title: "CountInStock",
      type: "number",
      placeholder: product.countInStock,
    },
    {
      id: "category",
      title: "Category",
      type: "text",
      placeholder: product.category,
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
      <div className="Bottom">
        <button
          className="Submit"
          onClick={() => updateProduct(product, product._id)}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
