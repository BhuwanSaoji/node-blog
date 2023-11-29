const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minLength: 10,
        lowercase:true,
        required : true,
        validation : {
            validator : (v)=> v.includes("@gmail.com")
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: Number,
    age: {
        type: Number,
        max: 80,
        min: 14,
    }
})

exports.User = mongoose.model("users", UserSchema);