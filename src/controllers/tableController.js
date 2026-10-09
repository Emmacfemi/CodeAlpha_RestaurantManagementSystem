const TableModel = require("../models/tableModel");

// Create Table
const createTable = async (req, res, next) => {
    try{
        const {
            tableNumber,
            capacity,
            status
        } = req.body;

        const newTable = await TableModel.create({
            tableNumber,
            capacity,
            status
        });


        return res.status(201).json({
            message: `Table Created successfully`,
            table: newTable
        });

    }catch(error){
        next(error);

    }
}

// Get Table by ID
const getTableById = async (req, res, next) => {
    try{
        const table = await TableModel.findById(
            req.params.id
        );

        if(!table){
            return res.status(404).json({
                message: `Table not available`
            });
        }

        return res.status(200).json({
            message: `Table fetched successfully`,
            table
        });

    }catch(error){
        next(error);

    }
}


// Get ALl Tables
const getAllTables = async (req, res, next) => {
    try{
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Number(req.query.limit)  || 10);

        const skip = (page - 1) * limit;

        const tables = await TableModel.find({})
                                .sort({createdAt: -1})
                                .skip(skip)
                                .limit(limit)


        return res.status(200).json({
            message: `All Tables fetched successfully`,
            table: tables
        });

    }catch(error){
        next(error);

    }
}


// Get Table By Capacity
const getTableByCapacity = async (req, res, next) => {
    try{
        const capacity = Number(req.query.capacity);

        if(!Number.isFinite(capacity) || capacity < 1){
            return res.status(400).json({
                message: `Please provide a valid capacity`
            });
        }

        const tables = await TableModel.find({
            capacity: capacity
        })

        return res.status(200).json({
            message: `Table fetched successfully`,
            tables
        });

    }catch(error){
        next(error);

    }
}


// Update Table
const updateTable = async (req, res, next) => {
    try{
        const updatedTable = await TableModel.finByIdAndUpdate(
            req.params.id,
            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if(!updatedTable){
            return res.status(404).json({
                message: `Table with ${req.params.id} not found`
            });
        }

        return res.status(200).json({
            message: `Table updated successfully`,
            table: updatedTable
        });

    }catch(error){
        next(error);

    }
}


// Delete Table 
const deleteTable = async (req, res, next) => {
    try{
        const deletedTable = await TableModel.findByIdAndDelete(
            req.params.id,
            
        );

        if(!deletedTable){
            return res.status(404).json({
                message: `Table with ${req.params.id} not found`
            });
        }

        return res.status(200).json({
            message: `Table with deleted successfully`,
            table: deletedTable
        });

    }catch(error){
        next(error);

    }
}


module.exports = {
    createTable,
    getTableByCapacity,
    getTableById,
    getAllTables,
    updateTable,
    deleteTable
}