import express from "express";
import {
  addOrderProduct,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAllOrders
} from "../controllers/order.js";
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(verifyToken, isAdmin, getAllOrders)
  .post(verifyToken, addOrderProduct)

router.route('/userOrder')
  .get(verifyToken, getOrderById)

router.route('/:id')
  .put(verifyToken, updateOrder)
  .delete(verifyToken, isAdmin, deleteOrder)

export default router;