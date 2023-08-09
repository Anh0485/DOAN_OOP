import express from 'express'
const router = express.Router();
import { getAllCoach } from '../controllers/coachController.js';


//get all category
router.route('/all').get(getAllCoach)



export default router;