import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

const router = Router();

 router.get('/getAllProduct', getAllProducts);
 router.get('/getCategory/:id', getProductById);
 router.post('/create', createProduct);
 router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
