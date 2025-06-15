const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// creat product --admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  // Total product count (unfiltered)
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // Clone the query before executing to get filtered count
  let filteredProducts = await apiFeature.query.clone();
  const filteredProductsCount = filteredProducts.length;

  // Add pagination to the query
  apiFeature.pagination(resultPerPage);

  // Execute paginated query
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});



// get product details
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler(404,"Product not found"));
    }

    res.status(201).json({
        success:true,
        product
    })
});

// update product --admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler(404,"Product not found"));
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

// delete product
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler(404,"Product not found"));
    }

    await Product.deleteOne({ _id: req.params.id }); 

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});