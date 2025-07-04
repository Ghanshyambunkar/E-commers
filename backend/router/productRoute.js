const express=require("express");
const { getAllProducts ,createProduct, updateProduct, deleteProduct, getProductDetails, getAdminProducts, createProductReview, getProductReviews, deleteReview} = require("../controllers/productController");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// router.route("/products/new").post(createProduct);

// router.route("/products/:id").put(updateProduct);

// router.route("/products/:id").delete(deleteProduct);

router
  .route("/products/:id")
  .get(getProductDetails);

router
  .route("/review")
  .put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview)

  
module.exports=router;