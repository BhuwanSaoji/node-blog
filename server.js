const express = require("express")
const bodyParser = require("body-parser");
const dotEnv = require("dotenv").config()
const mongoose = require("mongoose");
const cors = require("cors");
const { default: helmet } = require("helmet");
const { routes } = require("./routes");
const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/blog_management";
const NODE_PORT = process.env.NODE_PORT || 30001;


const app = express()

app.use(cors());

app.use(bodyParser.json({limit : "50mb", type: "application/json" }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(helmet.frameguard({action : "sameorigin"}))


// health check
app.get("/", (req,res)=>{
    res.send("Health check successful")
})



// validating content type
app.use((req, res, next)=>{
    let types = ["application/json", ""];
    if(req.headers["content-type"])
        if(types.includes(req.headers["content-type"]) ){
            next()
        }else{
            res.status(400).send("Invalid data")
        }
    else{
        next()
    }
})

routes(app)

// connecting with mongodb server
mongoose.connect(MONGO_DB_URL)

app.listen(NODE_PORT, ()=>{
    console.log("Server started at :", NODE_PORT)
})