const mongoose = require("mongoose");
const users = require("./UserSchema")
const comment = require("./CommentsSchema")

const BlogSchema = mongoose.Schema({
    blog_name: {
        type: String,
        maxLength: 50,
        minLength: 1,
        required: true
    },
    description: {
        type: String,
        maxLength: 1000,
        minLength: 1,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            date: {
                type: Date,
                default: () => Date.now()
            }
        }
    ],
    createdAt: {
        default: () => Date.now(),
        type: Date,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    }
})

exports.Blog = mongoose.model("blogs", BlogSchema)