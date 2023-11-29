const { decodeToken } = require("./helpers/jwt_helper");

exports.routes = (app) => {

    const LoginController = require("./controllers/loginController");
    const BlogController = require("./controllers/BlogController")

    app.post("/login", async (req, res, next) => {
        try {
            let result = await LoginController.login(req, res);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }

    })


    app.post("/forgot_password/:email/:name", async (req, res, next) => {
        try {
            let result = await LoginController.forgotPassword(req, res);
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }

    })


    // checking for token
    app.use((req, res, next) => {
        if (req.headers.authorization) {
            decodeToken(req, res, next);
        } else {
            res.status(401).send("Unauthorized user")
        }
    })

    app.post("/create_new_blog/", async (req, res, next) => {
        try {
            let result = await BlogController.createBlog(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    })

    app.post("/edit_blog/:blog_id", async (req, res, next) => {
        try {
            let result = await BlogController.editBlog(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    })

    app.delete("/delete_blog/:blog_id", async (req, res, next) => {
        try {
            let result = await BlogController.deleteBlog(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    })

    app.get("/get_blogs/", async (req, res, next) => {
        try {
            let result = await BlogController.getAllBlogs(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    })

    app.post("/add_comments/:blog_id", async (req, res, next) => {
        try {
            let result = await BlogController.addComment(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })


    app.delete("/delete_comment/:comment_id", async (req, res, next) => {
        try {
            let result = await BlogController.deleteComment(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    })


    app.get("/add_likes/:blog_id", async (req, res, next) => {
        try {
            let result = await BlogController.addLikesToBlog(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    app.get("/get_my_blogs", async (req, res, next) => {
        try {
            let result = await BlogController.getMyBlogs(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    app.get("/get_my_comments_on_blog", async (req, res, next) => {
        try {
            let result = await BlogController.myCommentsOnBlog(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    app.get("/get_liked_blogs", async (req, res, next) => {
        try {
            let result = await BlogController.myLikedBlogs(req, res);
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })


}