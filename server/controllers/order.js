import Order from "../models/Order.js";
import Product from "../models/Product.js";

//GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
}

const match = (product, item) => {

}

//CREATE ORDER
export const createOrder = async (req, res) => {
  let user = req.user._id;
  let countError = "";

  const newOrder = new Order({ ...req.body, user });

  if (newOrder.orderProducts.length === 0) {
    res.status(400).json('No Products In Order');
    return;
  }

  for (let i = 0; i < newOrder.orderProducts.length; i++) {
    let product = await Product.findById(newOrder.orderProducts[i]._id);
    let canOrder = product.countInStock - newOrder.orderProducts[i].quantity;

    if (canOrder < 0) {
      countError += `Product : ${product.name} Stock : ${product.countInStock} Wanted quantity : ${newOrder.orderProducts[i].quantity} \n`;
    }
  }

  if (countError !== "") {
    res.status(400).json(countError);
    return;
  }

  try {
    const savedOrder = await newOrder.save();

    for (let i = 0; i < req.body.orderProducts.length; i++) {

      const product = await Product.findById(req.body.orderProducts[i]._id);
      let newStock = product.countInStock - req.body.orderProducts[i].quantity;

      try {
        await Product.findByIdAndUpdate(
          req.body.orderProducts[i]._id,
          { ...req.body.orderProducts[i], countInStock: newStock },
          { new: true }
        );

      } catch (error) {
        res.json(error);
      }
    }

    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }

};

//GET USER ORDERS BY USER ID FOR USER
export const getUserOrders = async (req, res) => {
  let user = req.user._id;
  try {
    const order = await Order.find({ user: user });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER ORDERS BY USER ID FOR ADMIN
export const getOrdersById = async (req, res) => {
  let id = req.params.id;
  try {
    const orders = await Order.find({ user: id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

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

