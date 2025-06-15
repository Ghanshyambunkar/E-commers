const express=require("express");

const app=express();

const cookieParser=require("cookie-parser");

const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware=require("./middleware/error");

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// product route
const product=require('./router/productRoute');
app.use("/api/v1",product);

// user route
const user=require("./router/userRoute");
app.use("/api/v1",user);

// order route
const order=require('./router/orderRoute');
app.use("/api/v1",order);

// Middleware for errors
app.use(errorMiddleware);

module.exports=app;