import express from 'express';
const router = express.Router();
import { isUserAdmin, protect } from '../middleware/authMiddleware.js'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDeliver, updateOrderToPaid } from '../controllers/orderController.js'

router.route('/').post(protect, addOrderItems).get(protect, isUserAdmin, getOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isUserAdmin, updateOrderToDeliver);

export default router;
