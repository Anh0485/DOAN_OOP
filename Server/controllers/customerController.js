import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../Model/customerModel.js";

//@desc Fetch all category
//@route GET /api/categories/all
//@access private/admin

const getAllCustomer = asyncHandler(async (req, res) => {
    const customers = await Customer.find({}).sort({ _id: -1 });
    res.json(customers);
})


//rgister customer
const registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, DateEnrolled, DateExpiration, price, city } = req.body;

    const customerExists = await Customer.findOne({ email })

    if (customerExists) {

        res.status(400).json({ message: 'Customer already exist' })

    } else {
        const customer = await Customer.create({
            name,
            email,
            DateEnrolled, DateExpiration, price, city
        });

        if (customer) {
            res.status(201).json({
                id: customer._id,
                email: customer.email,
                name: customer.name,
                DateEnrolled: customer.DateEnrolled,
                DateExpiration: customer.DateExpiration,
                city: customer.city,
                price: customer.price
            })
        } else {
            res.status(400).json({ message: 'Invalid customer data' })
        }
    }
})



export { getAllCustomer, registerCustomer };