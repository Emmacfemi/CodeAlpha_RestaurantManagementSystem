const express = require("express");


const orderRoutes = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createOrder,
    getOrderById,
    getAllOrders,
    getOrderByUser,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

const {
    createOrderValidation,
    updateOrderValidation
} = require("../validations/orderValidation");


// TEST
orderRoutes.get("/test", (req, res) => {
    return res.status(200).json({
        message: `Orders running smoothly`
    });
});


// Create Order
orderRoutes.post("/", authMiddleware, createOrderValidation, createOrder);


// Get All Orders
orderRoutes.get("/", authMiddleware, getAllOrders);


// Get Order By User
orderRoutes.get("/user/:id", authMiddleware, getOrderByUser);


// Get Orders by ID
orderRoutes.get("/:id", authMiddleware, getOrderById);


// Update Order
orderRoutes.put("/:id", authMiddleware, updateOrderValidation, updateOrder);


// Delete Order
orderRoutes.delete("/:id", authMiddleware, deleteOrder);


module.exports = orderRoutes;