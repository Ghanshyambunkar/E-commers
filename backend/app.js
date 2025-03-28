const express=require("express");

const app=express();

const cookieParser=require("cookie-parser");

app.use(express.json());

app.use(cookieParser());

const errorMiddleware=require("./middleware/error");

// product route
const product=require('./router/productRoute');
app.use("/api/v1",product);

// user route
const user=require("./router/userRoute");
app.use("/api/v1",user);

// Middleware for errors
app.use(errorMiddleware);

module.exports=app;