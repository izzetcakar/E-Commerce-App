import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import ChangeProductItem from "../components/ChangeProductItem";

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
      console.log(error.response.data);
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
      id: "brand",
      title: "Brand",
      type: "text",
      placeholder: product.brand,
    },
    {
      id: "description",
      title: "Description",
      type: "text",
      placeholder: product.description,
    },
    {
      id: "countInStock",
      title: "countInStock",
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
    <div className="ItemContainer">
      <div className="SingleItemInfo">
        <img className="Image" alt="..." src={product.image} />
        <div className="Cart">
          <div className="Element">
            {elements.map((item, index) => (
              <ChangeProductItem
                item={item}
                handleChange={handleChange}
                key={index}
              />
            ))}
          </div>
          <div className="Element" style={{ justifyContent: "center" }}>
            <button
              className="Button"
              onClick={() => updateProduct(product, product._id)}
            >
              UPDATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
