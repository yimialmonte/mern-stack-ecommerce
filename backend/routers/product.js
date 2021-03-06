import express from 'express';
const router = express.Router();
import { protect, isUserAdmin } from '../middleware/authMiddleware.js';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, isUserAdmin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isUserAdmin, deleteProduct)
  .put(protect, isUserAdmin, updateProduct);

export default router;
