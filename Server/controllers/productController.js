import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../Model/productModel.js";
import mongoose from "mongoose";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

//@desc Fetch a product
//@route GET /api/product/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        return res.json(product)
    }
    res.status(404).json({ message: 'Product not found' })
})

//@desc Fetch all products
//@route GET /api/products
//@access Private/ admin
const getProductsByAdmin = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

//@desc update product 
//@route PUT /api/products
//@access Private/ admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, countInStock, description, category, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;
        product.description = description || product.description;
        product.category = category || product.category;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
})

//@desc delete product 
//@route Delete /api/products/:id
//@access Private/ admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: "Product deleted" });
    } else {
        res.status(404);
        throw new Error("Product not found!");
    }
})

//@desc create product 
//@route POST /api/products
//@access Private/ admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, countInStock, description, category, image } =
        req.body;

    const productExists = await Product.findOne({ name });

    if (productExists) {
        res.status(400);
        throw new Error("Product name already exists");
    } else {
        const product = new Product({
            name,
            price,
            countInStock,
            description,
            category,
            image,
            user: req.user._id,
        });

        if (product) {
            const createProduct = await product.save();
            res.status(201).json(createProduct);
        } else {
            res.status(400);
            throw new Error("Invalid product data");
        }
    }
})








export {
    getProductById,
    getProducts,
    getProductsByAdmin,
    updateProduct,
    deleteProduct,
    createProduct
};