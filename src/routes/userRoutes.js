const express = require("express");

const userRoutes = express.Router();

const {
    createValidation,
    updateValidation,
    loginValidation
} = require("../validations/userValidation");


const authMiddleware = require("../middlewares/authMiddleware");

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");


// Test
userRoutes.get("/test", (req, res) => {
    return res.status(200).json({
        message: `User Routes running successfully`
    });
});


// Register User 
userRoutes.post("/register", createValidation, registerUser);


// Login User
userRoutes.post("/login", loginValidation, loginUser);


// Get All Users
userRoutes.get("/", authMiddleware, getAllUsers);


// Get User By ID
userRoutes.get("/:id", authMiddleware, getUserById);


// Update User
userRoutes.put("/:id", authMiddleware, updateValidation, updateUser);


// Delete USer 
userRoutes.delete("/:id", authMiddleware, deleteUser);


module.exports = userRoutes;