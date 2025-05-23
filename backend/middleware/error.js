const ErrorHandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;

    err.message=err.message || "Ingternal Server Error";

    // Wrong Mongodb Id Error
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHandler(400 ,message);
    }

    res.status(err.statusCode).json({
        success: false,
        message:err.message
    });
};