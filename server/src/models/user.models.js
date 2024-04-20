const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        img: {
            type: String,
            required: true,
        },
        registrationNumber: {
            type: String,
            required: true,
        },
        session: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Users", userSchema);
