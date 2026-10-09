const OrderService = require("../services/orderServices");


// Create Order
const createOrder = async (req, res, next) => {
    try{
        const {
            items,
            totalAmount,
            status,
            orderType,
        } = req.body;

        const newOrder = await OrderService.createOrder({
            user: req.user.Id,
            items,
            totalAmount,
            status,
            orderType
        });

        return res.status(201).json({
            message: `Order created successfully`,
            order: newOrder
        });

    }catch(error){
        next(error);

    }
}


// Get All Orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getAllOrders();

        return res.status(200).json({
            message: `All Orders fetched successfully`,
            orders
        });
        
    } catch (error) {
        next(error);
        
    }
}


// Get Order by ID
const getOrderById = async (req, res, next) => {
    try{
        const order = await OrderService.getOrderById(
            req.params.id
        );

        if(!order){
            return res.status(404).json({
                message: `Order not found`
            });
        }

        return res.status(200).json({
            message: `Orders fetched successfully`,
            order
        });

    }catch(error){
        next(error);

    }
}


// Get Order by User
const getOrderByUser = async (req, res, next) => {
    try{
        const order = await OrderService.getOrderByUser(
            req.user.Id,
            req.params.id
        );

        if(!order){
            return res.status(200).json({
                message: `Order not found for this user`
            });
        }

        return res.status(200).json({
            message: `Order with ${req.params.id} fetched successfully`,
            order
        });

    }catch(error){
        next(error);
    }
}


// Update Order
const updateOrder = async (req, res, next) => {
    try{
        const updatedOrder = await OrderService.updateOrder(
            req.user.Id,
            req.body,
            req.params.id,
        );

        if(!updatedOrder){
            return res.status(404).json({
                message: `Order not found`
            });
        }

        return res.status(200).json({
            message: `Order updated successfully`,
            order: updatedOrder
        });

    }catch(error){
        next(error);

    }
}


// Delete Order
const deleteOrder = async (req, res, next) => {
    try{
        const deletedOrder = await OrderService.deleteOrder(
            req.user.Id,
            req.params.id
        );

        if(!deletedOrder){
            return res.status(404).json({
                message: `Order not found`
            });
        }

        return res.status(200).json({
            message: `Order deleted successfully`,
            order: deletedOrder
        });

    }catch(error){
        next(error);
    }
}


module.exports = {
    createOrder,
    getOrderById,
    getOrderByUser,
    getAllOrders,
    updateOrder,
    deleteOrder
}