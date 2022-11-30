import Cart from "../models/Cart.js";

//GET ALL CARTS
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
}

//ADD PRODUCT TO ORDER
export const addProductToCart = async (req, res) => {
  let user = req.user._id;

  if (newCart.cartProducts.length === 0) {
    res.status(400).json('No Products In Cart');
    return;
  }

  const newCart = new Cart({ ...req.body, user });

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET CART BY ID
export const getCartById = async (req, res) => {
  let user = req.user._id;

  try {
    const cart = await Cart.find({ userId: user });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE CART
export const updateCart = async (req, res) => {
  let user = req.user._id;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      user,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE CART
export const deleteCart = async (req, res) => {
  let user = req.user._id;
  try {
    await Cart.findByIdAndDelete(user);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

