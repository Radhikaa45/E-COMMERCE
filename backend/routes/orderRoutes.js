import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createOrder, getOrder, getUserOrders } from '../controllers/orderController.js';

const router = Router();

router.use(requireAuth);

router.post('/', createOrder);
router.get('/my', getUserOrders);
router.get('/:id', getOrder);

export default router;
