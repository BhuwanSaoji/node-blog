const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }, 
    description : {
        type: String,
        maxLength : 150,
        minLength : 1,
    },
    createdAt : {
        type : Date,
        default: ()=> Date.now(),
        immutable : true,
    }
})

 
exports.Comment = mongoose.model("comments", CommentsSchema)