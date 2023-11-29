const {Blog} = require("../schema/BlogSchema")
const {Users} = require("../schema/UserSchema")
const {errorLog, successMessage } = require("../helpers/common")
const { Comment } = require("../schema/CommentsSchema")


// CRUD operations on blogs
exports.createBlog = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {

            let user_id = req.decoded.user_id;
            let data = req.body;
            data.user_id = user_id
            let create = await Blog.create(data);

            console.log(create, "created")
            return resolve(successMessage("Data uploaded successfully"))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

exports.editBlog = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const blog_id = req.params.blog_id
            let user_id = req.decoded.user_id;
            let data = req.body;

            let updated = await Blog.findOneAndUpdate({"_id": blog_id, user_id}, data, {new: true, runValidators : true } )
            if(!updated){
                return resolve(errorLog("User doesn't have write perimission for this blog"))

            }
            return resolve(successMessage("Data updated successfully"))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

exports.deleteBlog = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const blog_id = req.params.blog_id
            let user_id = req.decoded.user_id;
            let data = req.body;

            let updated = await Blog.deleteOne({"_id": blog_id, user_id})
            if(!updated){
                return resolve(errorLog("User doesn't have delete perimission for this blog"))

            }
            return resolve(successMessage("Data deleted successfully"))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

exports.getAllBlogs = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let data = await Blog.find()
                .populate("user_id", "name email")
                .populate({
                    path: "likes",
                    populate: {
                        path: "user",
                        model :"users",
                        select: "email name"
                    }
                    
                })
                .populate({
                    path: 'comments',
                    populate: {
                      path: 'name',
                      model: 'users',
                      select: "name email"
                    },
                  })
            if(!data){
                return resolve(errorLog("No blogs available"))
            }
            return resolve(successMessage("Data retrieved successfully",data ))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

// Adding and deleting comments in a blog
exports.addComment = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user_id = req.decoded.user_id;
            let blog_id = req.params.blog_id;
            let data = req.body;
            data["name"] = user_id

            let create = await Comment.create(data);
            let id = create._id;
            let update = await Blog.findOneAndUpdate({"_id": blog_id}, {$push : {"comments" : id} }, {new: true, runValidators: true} )
            return resolve(successMessage("Data updated successfully"))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

exports.deleteComment = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user_id = req.decoded.user_id;
            let comment_id = req.params.comment_id;

            let deleted = await Comment.deleteOne({"_id": comment_id, "name": user_id})
            console.log(deleted, "delete")
            return resolve(successMessage("Data deleted successfully"))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

// adding likes to the blog
exports.addLikesToBlog = (req, res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user_id = req.decoded.user_id;
            let blog_id = req.params.blog_id;

            let blog = await Blog.findOne({"_id": blog_id }).push(user_id);
            // blog.likes.push({
            //     user : user_id
            // })
            // blog.save();
            return resolve(successMessage("Like added successfully"))
            
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}

// finding all my blogs 
exports.getMyBlogs =(req,res)=>{
    return new Promise(async(resolve, reject)=>{
        try {

            let user_id = req.decoded.user_id;
            let data = await Blog.where("user_id")
            .equals(user_id)
            .populate({
                path: "comments", // name of field in Blog model
                populate: {
                    path: "name", //name of the field in Comments model
                    model: "users",
                    select: "name email"
                }   
            })
            .populate({
                path: "likes",
                populate: {
                    path: "user",
                    model: "users",
                    select: "name email"
                }   
            })
            .sort("blog_name");

            return resolve(successMessage("Data fetched ", data))
            
        } catch (error) {
            return reject(errorLog())
        }
    })
}

// finding all the blogs i have added comments on
exports.myCommentsOnBlog =(req, res)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            
            let user_id = req.decoded.user_id;
            
            let comments = await Comment.where("name").in([user_id]);
            let ids=  comments.map(item=>item._id)
            let blogs = await Blog.where("comments")
                .in(ids)
                .populate({
                    path: "comments",
                    populate: {
                        path: "name",
                        model: "users",
                        select: "name email"
                    }
                })

            return resolve({blogs})

        } catch (error) {
            return reject(errorLog())
        }
    })
}

// finding all the blogs i have liked
exports.myLikedBlogs =(req,res)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user_id = req.decoded.user_id;

            let data = await Blog.where("likes.user").in([user_id])
            console.log(data)
            return resolve(successMessage("Success",data))
        } catch (error) {
            console.log(error)
            return reject(errorLog())
        }
    })
}




