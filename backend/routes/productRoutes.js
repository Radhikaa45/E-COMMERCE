import { Router } from 'express';
import { getProducts, getFeatured, getProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/featured', getFeatured);
router.get('/:slug', getProduct);

export default router;
