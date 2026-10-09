const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        subTotal: {
            type: Number,
            required: true,
            min: 0
        },

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("OrderItem", orderItemSchema);

