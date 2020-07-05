function createErrorMessage (error){
    return error.message.includes("Path")
    ? "Please fullfil all fields"
    : error.message.split(": ")[error.message.split(": ").length - 1];
}

function renderMessage (error,res,path,data,next) {
    if(error.name === "ValidationError") {
        const message = createErrorMessage(error);
        res.render(path,{message , ...data}); return;
    }
    if(error.name === "MongoError"){
        const message = `${Object.keys(error.keyValue)[0]} is already taken`
        res.render(path,{message ,...data}); return;
    }
    next(error);

}

module.exports= renderMessage;