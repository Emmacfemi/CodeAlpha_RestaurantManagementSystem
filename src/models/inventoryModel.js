const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 7,
            maxlength: 20
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: String,
            required: true,
            trim: true
        },

        minimumStock: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: [
                'available',
                'out of stock',
                'low stock'                ,
            ],
            default: 'available'
        },

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Inventory", inventorySchema);