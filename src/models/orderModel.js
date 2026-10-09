const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },

        items: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem"
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            required: true,
            enum: [
                'pending',
                'confirmed',
                'preparing',
                'ready',
                'completed',
                'cancelled'
            ],
            default: 'pending',
        },

        orderType: {
            type: String,
            required: true,
            enum: [
                'delivery',
                'pickup',
                'dine-in'
            ],
        },

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);