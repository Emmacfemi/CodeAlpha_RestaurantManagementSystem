const InventoryService = require("../services/inventoryService");


// Create Inventory
const createInventory = async (req, res, next) => {
    try {
        const { name, quantity, unit, minimumStock, status } = req.body;
    
        const newInventory = await InventoryService.createInventory({
            name,
            quantity,
            unit,
            minimumStock,
            status
        });
    
        return res.status(201).json({
            message: `Inventory created successfully`,
            inventory: newInventory
        });
        
    } catch (error) {
        next(error);
        
    }

}


// Get Inventory by ID
const getInventoryById = async (req, res, next) => {
    try {
        const inventory = await InventoryService.getInventoryById(
            req.params.id
        );

        if(!inventory){
            return res.status(404).json({
                message: `Inventory with ${req.params.id} not found`
            });
        }

        return res.status(200).json({
            message: `Inventory fetched successfully`,
            inventory
        });

        
    } catch (error) {
        next(error);
        
    }
}

// Get All Inventory
const getAllInventories = async (req, res, next) => {
    try {
        const inventories = await InventoryService.getAllInventories();

        return res.status(200).json({
            message: `All inventories fetched successfully`,
            inventories
        });
        
    } catch (error) {
        next(error);
        
    }
}


// Update Inventory
const updateInventory = async (req, res, next) => {
    try {
        const updatedInventory = await InventoryService.updateInventory(
            req.params.id,
            req.body
        );
    
        if(!updatedInventory){
            return res.status(404).json({
                message: `Inventory not found`
            });
        }
    
        return res.status(200).json({
            message: `Inventory updated successfully`,
            inventory: updatedInventory
        });
        
    } catch (error) {
        next(error);
        
    }

}


// Delete Inventory
const deleteInventory = async (req, res, next) => {
    try {
        const deletedInventory = await InventoryService.deleteInventory(
            req.params.id
        );
    
        if(!deletedInventory){
            return res.status(404).json({
                message: `Inventory not found`
            });
        }
    
        return res.status(200).json({
            message: `Inventory deleted successfully`,
            inventory: deletedInventory
        });
        
    } catch (error) {
        next(error);
        
    }

}


module.exports = {
    createInventory,
    getInventoryById,
    getAllInventories,
    updateInventory,
    deleteInventory
}