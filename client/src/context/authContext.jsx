import axios from "axios";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);

  const login = async (inputs) => {
    const res = await axios.post("/user/login", inputs);
    setUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/user/logout");
    setUser(null);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("/user/profile");
      setUser((prev) => data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product, qty) => {
    let inCart = cartItems.some((item) => item._id === product._id);

    if (inCart) {
      let a = cartItems.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: (item.quantity += qty) };
        } else {
          return item;
        }
      });
      setCartItems((prev) => a);
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...product, quantity: qty, product: product._id },
      ]);
    }
    let addToTotal = product.price * qty;
    setTotal((prev) => prev + addToTotal);
  };

  const reduceFromCart = async (product, qty) => {
    let cartProduct = cartItems.find((item) => item._id === product._id);

    if (cartProduct.quantity - qty >= 0) {
      let reduceTotal = product.price * qty;
      setTotal((prev) => prev - reduceTotal);
    }

    let a = cartItems.map((item) => {
      if (item._id === product._id) {
        return {
          ...item,
          quantity: (item.quantity -= qty),
        };
      } else {
        return item;
      }
    });
    let b = a.filter((item) => item.quantity > 0);
    setCartItems((prev) => b);
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  const values = {
    user,
    login,
    logout,
    search,
    setSearch,
    total,
    cartItems,
    addToCart,
    getUser,
    reduceFromCart,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContext;
