const { errorLog, successMessage } = require("../helpers/common");
const { createToken } = require("../helpers/jwt_helper");
const { User } = require("../schema/UserSchema");

exports.login =(req, res)=>{
    return new Promise( async (resolve, reject)=>{
        try {
            let {email, password} = req.body;
            console.log(email, password)
            let data = await User.where("email").equals(email).where("password").equals(password);
            if(!data || data.length==0){
                return reject(errorLog("Incorrect name/password entered"));
            }
            console.log(data, "data")
            let token = await createToken(data[0])
            console.log(token, "token")
            return resolve(successMessage("Authenticated successfully", token))

        } catch (error) {
            console.error(error)
            return reject(errorLog("Something went wrong"))
        }
    })
}


exports.forgotPassword =(req, res)=>{
    return new Promise(async (resolve, reject)=>{
        try {

            const  {email, name } = req.params;
            const {password, confirm_password } = req.body;

            if(password !==  confirm_password){
                return reject(errorLog("Confirm password and new password didnt matched"))
            }

            let update_id = await User.where("email").equals(email).where("name").equals(name).select("_id").limit(1);
            let update = await User.findOneAndUpdate({_id : update_id[0]._id }, {password} ,  {runValidators : true, new : true})
            return resolve(successMessage(`Password updated successfully for user : ${name}` ))
        } catch (error) {
            console.log(error)
            return reject(errorLog("Something went wrong"))
        }
    })
}