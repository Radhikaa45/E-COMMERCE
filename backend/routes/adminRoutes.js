import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import {
  getDashboardStats,
  adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct,
  adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory,
  adminGetOrders, adminUpdateOrderStatus,
} from '../controllers/adminController.js';

const router = Router();

router.use(requireAuth, requireAdmin);

// Dashboard
router.get('/stats', getDashboardStats);

// Products
router.get('/products', adminGetProducts);
router.post('/products', adminCreateProduct);
router.put('/products/:id', adminUpdateProduct);
router.delete('/products/:id', adminDeleteProduct);

// Categories
router.get('/categories', adminGetCategories);
router.post('/categories', adminCreateCategory);
router.put('/categories/:id', adminUpdateCategory);
router.delete('/categories/:id', adminDeleteCategory);

// Orders
router.get('/orders', adminGetOrders);
router.patch('/orders/:id/status', adminUpdateOrderStatus);

export default router;
