const express = require("express");

const tableRoutes = express.Router();

const {
    createTable,
    getTableByCapacity,
    getAllTables,
    getTableById,
    updateTable,
    deleteTable
} = require("../controllers/tableController");


// TEST
tableRoutes.get("/test", (req, res) => {
    return res.status(200).json({
        message: `Table Endpoints running successfully`
    });
});


// Create Table
tableRoutes.post("/", createTable);


// Get Table By Capacity
tableRoutes.get("/capacity", getTableByCapacity);


// Get Table By Id
tableRoutes.get("/:id", getTableById);


// Get All Tables 
tableRoutes.get("/", getAllTables);


// Update Table
tableRoutes.put("/:id", updateTable);


// Delete Table
tableRoutes.delete("/:id", deleteTable);


module.exports = tableRoutes;