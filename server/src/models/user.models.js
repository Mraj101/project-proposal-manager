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
            required: true,
        },
        img: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        session: {
            type: String,
            default:null,
        },
        department: {
            type: String,
            required: true,
        },
        position: {
            type: String, 
            required: true,
        },
        gender:{
            type:String,
            required:true,
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
