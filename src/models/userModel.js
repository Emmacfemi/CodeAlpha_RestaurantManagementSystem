const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 2,
            maxlength: 50,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: [
                'customer',
                'staff',
                'admin'
            ],
            default: "admin"
        }
    },

    {
        timestamps: true
    }
);

const mongooseUser = mongoose.model("User", userSchema);

module.exports = mongooseUser;