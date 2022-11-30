import express from "express";
import {
  getProductById,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../controllers/product.js";
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(verifyToken, createProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(verifyToken, deleteProduct)
  .put(verifyToken, updateProduct)

export default router;