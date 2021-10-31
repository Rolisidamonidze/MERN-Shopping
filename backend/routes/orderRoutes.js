import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getOrders, updateOrderToPaid } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router;
