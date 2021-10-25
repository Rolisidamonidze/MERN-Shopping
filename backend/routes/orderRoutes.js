import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, getOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
