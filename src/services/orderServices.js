const OrderModel = require("../models/orderModel");


// Create Order 
const createOrder = async (orderData) => {
    const newOrder = new OrderModel({
        ...orderData
    });

    await newOrder.save();

    return newOrder;

}


// Get Order by Id
const getOrderById = async (orderId) => {
    const order = await OrderModel.findById(
        orderId
    );

    if(!order){
        return null
    }

    return order;

}


// Get All Order
const getAllOrders = async ( page = 1, limit = 10) =>  {
    const skip = ( page - 1 ) * limit

    const orders = await OrderModel.find({})
                        .sort({ createdAt: -1 })
                        .limit(limit)
                        .skip(skip)
    
    return orders;

}


// Get Order By User
const getOrderByUser = async (userId, orderId) => {
    const order = await OrderModel.findOne(
        {
            user: userId,
            _id: orderId
        }
    );

    if(!order){
        return null;
    }

    return order;
}


// Update Order
const updateOrder = async (userId, orderData, orderId) => {
    const order = await OrderModel.findOne(
        {
            _id: orderId,
            user: userId,
        }
    );

    if(!order){
        return null;
    }

    const updatedOrder = await OrderModel.findOneAndUpdate(
        { 
            _id: orderId,
            user: userId
        },

        {
            ...orderData
        },

        {
            new: true,
            runValidators: true
        }
    );

    return updatedOrder;

}


// Delete Order
const deleteOrder = async (userId, orderId, orderData) => {
    const order = await OrderModel.findOne(
        {
            _id: orderId,
            user: userId,
        }
    );

    if(!order){
        return null;
    }

    const deletedOrder = await OrderModel.findOneAndDelete(
        {
            _id: orderId,
            user: userId,
            
        }

    );

    return deletedOrder;
}

module.exports = {
    createOrder,
    getOrderById,
    getOrderByUser,
    getAllOrders,
    updateOrder,
    deleteOrder
}