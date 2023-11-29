const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "Bl0G@P10"

exports.createToken = async (body) => {
    try {
        let data = {};

        data["name"] = body.name;
        data["email"] = body.email;
        data["role"] = body.role;
        data["user_id"] = body._id

        const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
        return token
    } catch (err) {
        console.error("err", err)
    }

}

exports.decodeToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error(err)
                return res.status(401).send("Something went wrong");
            }

            req.decoded = decoded
            next()
        })
    } catch (error) {
        console.error(error)
        // res.status(401).send("Something went wrong");
        
    }

}