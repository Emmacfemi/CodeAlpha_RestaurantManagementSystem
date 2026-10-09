const MenuModel = require("../models/menuItemModel");

// Create Menu
const createMenu = async (req, res, next) => {
    try {
        const {
            name, 
            description,
            price,
            category,
            isAvailable
        } = req.body;

        const newMenu = await MenuuModel.create({
            name, 
            description,
            price,
            category,
            isAvailable           
        });

        return res.status(201).json({
            message: `Menu created successfully`,
            menu: newMenu
        });
        
    } catch (error) {
        next(error);
        
    }
}


// Get All Menus
const getAllMenu = async (req, res, next) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, Number(req.query.limit) || 10)
        );

        const skip = ( page - 1 ) * limit

        const menu = await MenuModel.find({})
                                    .sort({ createdAt: -1})
                                    .skip(skip)
                                    .limit(limit)
    
        return res.status(200).json({
            message: `All menus fetched succesfully`,
            page,
            limit,
            menu
        });
        
    } catch (error) {
        next(error);
        
    }
}


// Get Menu by Category 
const getMenuByCategory = async (req, res, next) => {
    try {
        const menu = await MenuModel.find({
            category: req.params.category
        });

        if(menu.length === 0){
            return res.status(404).json({
                message: `No menu items found for this category`
            });
        }

        return res.status(200).json({
            message: `Menu by category fetched successfully`,
            menu
        });

        
    } catch (error) {
        next(error);
        
    }
}


// Get Menu by name
const getMenuByName = async (req, res, next) => {
    try{
        const menu = await MenuModel.findOne(
            {
                name: req.params.name
            }
        );

        if(!menu){
            return res.status(404).json({
                message: `Menu with ${req.params.name} do not exsit`
            });
        }

        return res.status(200).json({
            message: `Menu displyed successfully`,
            menu
        });

    }catch(error){
        next(error);

    }
}


// Update Menu
const updateMenu = async (req, res, next) => {
    try{
        const updatedMenu = await MenuModel.findByIdAndUpdate(
            req.params.id,
            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if(!updatedMenu){
            return res.status(404).json({
                message: `Menu not found`
            });
        }

        return res.status(200).json({
            message: `Menu updated successfully`,
            menu: updatedMenu
        });

    }catch(error){
        next(error);
    }
}


// Delete Menu
const deleteMenu = async (req, res, next) => {
    try{
        const deletedMenu = await MenuModel.findByIdAndDelete(
            req.params.id
        );

        if(!deletedMenu){
            return res.status(404).json({
                message: `Menu not found`
            });
        }

        return res.status(200).json({
            message: `Menu deleted successfully`,
            menu: deletedMenu
        });

    }catch(error){
        next(error);
    }
}


module.exports = {
    createMenu,
    getAllMenu,
    getMenuByName,
    getMenuByCategory,
    updateMenu,
    deleteMenu
}