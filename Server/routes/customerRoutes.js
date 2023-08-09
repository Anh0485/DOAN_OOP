import express from 'express'
const router = express.Router();
import { getAllCustomer, registerCustomer } from '../controllers/customerController.js';

//create customer
router.route('/').post(registerCustomer)

//get all category
router.route('/all').get(getAllCustomer)



export default router;