import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLayoutEffect } from "react";
import CartObj from "../components/CartObj";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartReducer";

const Productinfo = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

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

  const removeProduct = () => {
    if (qty > 1) {
      setQty((prev) => (prev -= 1));
    }
  };

  return (
    <div className="CartContainer">
      <CartObj
        item={product}
        quantity={qty}
        addProduct={() => setQty((prev) => (prev += 1))}
        removeProduct={() => removeProduct()}
      />
      <div className="Bottom">
        <div
          className="Submit"
          onClick={() => dispatch(addProduct({ product: product, qty: qty }))}
        >
          ADD TO CART
        </div>
      </div>
    </div>
  );
};

export default Productinfo;
