const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        description: {
            type: String,
            trim: true,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Appetizers",
                "Main Course",
                "Beverages",
                "Desserts",
                "Sides"
            ],
            trim: true
        },

        isAvailable: {
            type: Boolean,
            default: true
        }

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);