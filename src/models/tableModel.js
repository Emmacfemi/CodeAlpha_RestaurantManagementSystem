const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number,
            required: true,
            unique: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            required: true,
            enum: [
                'available',
                'reserved',
                'occupied',
                'maintenance'
            ],
            default: 'available'
        },

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Table", tableSchema);
