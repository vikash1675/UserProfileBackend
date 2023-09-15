const mongoose = require('mongoose');

const userSchima = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
},
    {
        timestamps: true,
    }
)

module.exports = new mongoose.model("User", userSchima);

