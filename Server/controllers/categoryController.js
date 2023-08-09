import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../Model/categoryModel.js";

//@desc Fetch all category
//@route GET /api/categories/all
//@access private/admin

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.json(categories);
})


//@desc create category
//@route POST /api/categories
//@access private/admin
const createCategories = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        res.status(400).json({
            msg: "Category name already exists"
        })
    } else {
        const category = new Category({ name, description });

        if (category) {
            const createCategory = await category.save();
            res.status(200).json({ createCategory })
        } else {
            res.status(400).json({
                msg: "Invalid category data"
            })
        }
    }
})

//@desc get  category by id
//@route GET /api/categories/:id
//@access Private/ admin

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.status(200).json(category);
    } else {
        res.status(404).json({
            msg: "Category not found"
        })
    }
})

//@desc update category 
//@route PUT /api/categories/:id
//@access Private/ admin

const updateCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id)

    if (category) {
        category.name = name || category.name
        category.description = description || category.description;

        const updatedCategory = await category.save();
        res.status(200).json({
            msg: "updated category",
            updatedCategory
        })
    } else {
        res.status(404).json({
            msg: "Category are not found"
        })
    }

})



export { getAllCategories, createCategories, getCategoryById, updateCategory };