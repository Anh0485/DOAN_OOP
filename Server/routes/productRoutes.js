import express from 'express'
const router = express.Router();
// import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../Model/productModel.js';
import { getProductById, getProducts, getProductsByAdmin, updateProduct, deleteProduct, createProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
//get all product
//create product
router.route('/')
    .get(getProducts)
    .get(protect, admin, getProductsByAdmin)
    .post(protect, admin, createProduct);

//get by id
//update  product
router.route('/:id').get(getProductById).put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);







export default router;
