const InventoryModel = require("../models/inventoryModel");


// CREATE INVENTORY
const createInventory = async (inventoryData) => {
    const newInventory = new InventoryModel({
        ...inventoryData
    });

    await newInventory.save();

    return newInventory

}


// GET AN INVENTORY BY ID
const getInventoryById = async (inventoryId) => {
    const inventory = await InventoryModel.findById(
        inventoryId
    );

    if(!inventory){
        return null;
    }

    return inventory;
}


// GET ALL INVENTORY 
const getAllInventories = async (page = 1, limit = 10) => {
    const skip = ( page - 1) * limit

    const inventories = await InventoryModel.find({
        
    })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)

    return inventories;
}


// UPDATE INVENTORIES
const updateInventory = async (inventoryId, inventoryData) => {
    const inventory = await InventoryModel.findById(
        inventoryId
    );

    if(!inventory){
        return null
    }

    const updatedInventories = await InventoryModel.findByIdAndUpdate(
        inventoryId,

        {
            ...inventoryData
        },

        {
            new: true,
            runValidators: true
        }
    );

    return updatedInventories;
}


// DELETE INVENTORIES
const deleteInventory = async (inventoryId) => {
    const inventory = await InventoryModel.findById(
        inventoryId
    );

    if(!inventory){
        return null
    }

    const deletedInventory = await InventoryModel.findByIdAndDelete(
        inventoryId,
    );

    return deletedInventory;
}

module.exports = {
    createInventory,
    getInventoryById,
    getAllInventories,
    updateInventory,
    deleteInventory,
}