import asyncHandler from "../middleware/asyncHandler.js";
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import generateToken from "../utils/generateToken.js";
//@desc Auth user and get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    try {
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            })
        } else {
            res.status(401).json({ message: 'Invalid Email or Password' })
        }

    } catch (e) {
        console.log(`Error by: ${e}`)
    }
})


//@desc  Register users
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })

    if (userExists) {

        res.status(400).json({ message: 'User already exist' })

    } else {
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }
    }
})

//@desc  Logout user/ clear cookies
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logout successed' })
})

//@desc  Get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404).json({ message: "User's not found" })
    }
})

//@desc  Update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Update successed",
            id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(404).json({ message: "User's not found" })
    }
})

//@desc  Get user 
//@route GET /api/users
//@access private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users)
})

//@desc  Get user by ID
//@route GET /api/users
//@access private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User's not found" })
    }

})

//@desc  Delete user 
//@route DELETE /api/users/:id
//@access private/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' })
    } else {
        res.status(404).json({ message: "User's not found" })
    }
})

//@desc  Update user 
//@route PUT /api/users/:id
//@access private/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        }
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Update successed",
            id: updatedUser._id,
            email: updatedUser.email,

            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(404).json({ message: "User's not found" })
    }
    // res.send('udpate user');
})
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}