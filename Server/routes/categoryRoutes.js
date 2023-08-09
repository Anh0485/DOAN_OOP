import express from 'express'
const router = express.Router();
// import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../Model/productModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { createCategories, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryController.js';


//get all category
router.route('/all').get(protect, admin, getAllCategories)

router.route('/').post(protect, admin, createCategories)



//get by id
router.route('/:id')
    .get(protect, admin, getCategoryById)
    .put(protect, admin, updateCategory)

export default router;
