import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { useLayoutEffect } from "react";

const Productinfo = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { cartItems, addToCart } = useContext(AuthContext);

  useLayoutEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const { data } = await axios(`/product/${id}`);
      setProduct((prev) => data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="ItemContainer">
      <div className="SingleItemInfo">
        <img className="Image" alt="..." src={product.image} />
        <div className="ItemDetail">
          <div className="Name">{product.name}</div>
          <div className="Price">{product.price}</div>
        </div>
        <div className="Cart">
          <div className="Element">
            <div className="Title">Price</div>
            <div className="Value">{product.price}</div>
          </div>
          <div className="Element">
            <div className="Title">Status</div>
            <div className="Value">{product.countInStock}</div>
          </div>
          <div className="Element">
            <div className="Title">Qty</div>
            <div className="Value">1</div>
          </div>
          <div className="Element" style={{ justifyContent: "center" }}>
            <select
              value={qty}
              onChange={({ target }) => setQty(Number(target.value))}
            >
              {[...Array(product.countInStock)].map((option, index) => (
                <option value={index + 1} key={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button className="Button" onClick={() => addToCart(product, qty)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productinfo;
