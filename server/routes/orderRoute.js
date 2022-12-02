import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrdersById
} from "../controllers/order.js";
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(verifyToken, isAdmin, getAllOrders)
  .post(verifyToken, createOrder)

router.route('/userOrder')
  .get(verifyToken, getUserOrders)

router.route('/:id')
  .get(verifyToken, isAdmin, getOrdersById)
  .put(verifyToken, isAdmin, updateOrder)
  .delete(verifyToken, isAdmin, deleteOrder)

export default router;