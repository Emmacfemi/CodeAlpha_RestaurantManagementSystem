const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        reservationDate: {
            type: Date,
            required: true
        },

        reservationTime: {
            type: String,
            required: true
        },

        numberOfGuests: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: [
                'pending',
                'confirmed',
                'cancelled',
                'completed'
            ],
            default: 'pending',
        },

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Reservation", reservationSchema);
