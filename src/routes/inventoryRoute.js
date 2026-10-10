
const express = require("express");

const inventoryRoutes = express.Router();

const {
    createInventory,
    getInventoryById,
    getAllInventories,
    updateInventory,
    deleteInventory
} = require("../controllers/inventoryController");


// Create Inventory
inventoryRoutes.post("/", createInventory);

// Get All Inventories
inventoryRoutes.get("/", getAllInventories);

// Get Inventory by ID
inventoryRoutes.get("/:id", getInventoryById);

// Update Inventory
inventoryRoutes.put("/:id", updateInventory);

// Delete Inventory
inventoryRoutes.delete("/:id", deleteInventory);


module.exports = inventoryRoutes; 