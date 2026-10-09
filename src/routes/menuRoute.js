
const express = require("express");

const menuRoutes = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createMenu,
    getAllMenu,
    getMenuByName,
    getMenuByCategory,
    updateMenu,
    deleteMenu
} = require("../controllers/menuController");

const { 
    createValidation, 
    updateValidation, 
    fileValidation 
} = require("../validations/menuItemValidation");

const upload = require("../middlewares/upload");


// Create Menu
menuRoutes.post("/", upload.single("image"), fileValidation, createValidation, createMenu);

// Get All Menus
menuRoutes.get("/", getAllMenu);

// Get Menu by Category
menuRoutes.get("/category/:category", getMenuByCategory);

// Get Menu by Name
menuRoutes.get("/name/:name", getMenuByName);

// Update Menu
menuRoutes.patch("/:id", updateValidation, authMiddleware, updateMenu);

// Delete Menu
menuRoutes.delete("/:id", authMiddleware, deleteMenu);


module.exports = menuRoutes;