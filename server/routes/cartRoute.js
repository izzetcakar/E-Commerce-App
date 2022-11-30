import express from "express";
import {
  addProductToCart,
  getCartById,
  updateCart,
  deleteCart,
  getAllCarts
} from "../controllers/cart.js";
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/allCarts')
  .get(verifyToken, isAdmin, getAllCarts)

router.route('/')
  .get(verifyToken, getCartById)
  .post(verifyToken, addProductToCart)
  .put(verifyToken, updateCart)
  .delete(verifyToken, isAdmin, deleteCart)

export default router;