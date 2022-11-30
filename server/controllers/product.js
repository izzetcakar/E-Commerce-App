import Product from "../models/Product.js";

//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//CREATE PRODUCT
export const createProduct = async (req, res) => {
  let user = req.user._id;
  let product = new Product({ ...req.body, user: user, seller: req.user.username });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove();
    res.json('Product removed');
  } else {
    res.status(404).json('Product not found');
  }
}

//UPDATE PRODUCT
export const updateProduct = async (req, res) => {

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    return res.status(404).json("Product not found");
  }
}