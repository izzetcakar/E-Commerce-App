import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartReducer";
import CartObj from "../components/CartObj";
import { addProduct, reduceProduct } from "../redux/cartReducer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useContext(AuthContext);

  const makeOrder = async (cart, total) => {
    try {
      await axios.post("/order", {
        orderProducts: cart,
        totalPrice: total,
      });
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <div className="CartContainer">
      <h1 className="MainTitle">SHOPPING CART</h1>
      {cartItems &&
        cartItems
          .filter((item) => {
            if (search === "") return item;
            else if (item.name.toLowerCase().includes(search.toLowerCase()))
              return item;
          })
          .map((item, index) => (
            <CartObj
              item={item}
              quantity={item.quantity}
              key={index}
              addProduct={() => dispatch(addProduct({ product: item, qty: 1 }))}
              removeProduct={() =>
                dispatch(reduceProduct({ product: item, qty: 1 }))
              }
            />
          ))}
      <div className="Bottom">
        <h1 className="Total">Total Amount: {total}$</h1>
        <button className="Submit" onClick={() => makeOrder(cartItems, total)}>
          Make Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
