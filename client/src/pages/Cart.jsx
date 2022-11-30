import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

const Cart = () => {
  const { cartItems, total, addToCart, reduceFromCart } =
    useContext(AuthContext);

  const makeOrder = async (cart, total) => {
    try {
      const res = await axios.post("/order", {
        orderProducts: cart,
        totalPrice: total,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="CartContainer">
      <div className="LeftContainer">
        <div className="MainTitle">SHOPPING CART</div>
        {cartItems &&
          cartItems.map((item) => (
            <div className="ItemContainer" key={item._id}>
              <img className="Image" src={item.image} />
              <div className="Title">{item.name}</div>
              <div className="Price">{Math.floor(item.price)}</div>
              <div className="QtyContainer">
                <RemoveCircleIcon
                  className="Icon"
                  onClick={() => reduceFromCart(item, 1)}
                />
                <div className="Qty">{item.quantity}</div>
                <AddCircleIcon
                  className="Icon"
                  onClick={() => addToCart(item, 1)}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="RightContainer">
        <div className="Title">SUBTOTAL {cartItems.length} ITEMS</div>
        <div className="Price">{total}</div>
        <button className="Button" onClick={() => makeOrder(cartItems, total)}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
