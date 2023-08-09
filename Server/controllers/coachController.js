import asyncHandler from "../middleware/asyncHandler.js";
import Coach from "../Model/coachModel.js";

//@desc Fetch all category
//@route GET /api/categories/all
//@access private/admin

const getAllCoach = asyncHandler(async (req, res) => {
    const coaches = await Coach.find({}).sort({ _id: -1 });
    res.json(coaches);
})





export { getAllCoach };