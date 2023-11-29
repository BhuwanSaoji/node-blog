exports.errorLog =(message="Something went wrong")=>{
    return {statusCode: 500, status: "error", message}
}


exports.successMessage =(message="Success", data)=>{
    return {statusCode: 200, status: "success", message, data}
}