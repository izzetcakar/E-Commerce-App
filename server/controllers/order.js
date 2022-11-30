import Order from "../models/Order.js";

//GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
}

//ADD PRODUCT TO ORDER
export const addOrderProduct = async (req, res) => {
  let user = req.user._id;

  const newOrder = new Order({ ...req.body, user });

  if (newOrder.orderProducts.length === 0) {
    res.status(400).json('No Products In Order');
    return;
  }

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ORDER BY ID
export const getOrderById = async (req, res) => {
  let user = req.user._id;
  try {
    const order = await Order.find({ user: user });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE ORDER
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

