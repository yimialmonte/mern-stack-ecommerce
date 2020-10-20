import express from 'express';
const router = express.Router();
import { protect, isUserAdmin } from '../middleware/authMiddleware.js';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, isUserAdmin, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isUserAdmin, deleteProduct)
  .put(protect, isUserAdmin, updateProduct);

export default router;
