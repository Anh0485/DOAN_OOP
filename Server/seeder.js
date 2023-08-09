import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './data/users.js';
import products from "./data/products.js";
import customers from "./data/customers.js";
import User from './Model/userModel.js'
import Product from "./Model/productModel.js";
import connectDB from './config/connectDB.js';
import colors from 'colors'
import Order from "./Model/orderModel.js";
import Customer from "./Model/customerModel.js"
import Coach from "./Model/coachModel.js";
import coaches from "./data/coaches.js";
dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        await Customer.deleteMany();
        await Coach.deleteMany();
        const createdUsers = await User.insertMany(users);
        const createdCustomers = await Customer.insertMany(customers);
        const createdCoaches = await Coach.insertMany(coaches)
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser
            }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse)
        process.exit()
    } catch (e) {
        console.error(`${e}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany();
        await Customer.deleteMany();
        console.log('Data Destroyed'.green.inverse)
        process.exit()
    } catch (e) {
        console.error(`${e}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}

