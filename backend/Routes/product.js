

const express = require('express')
const { getAllProducts, createProducts, updateProducts, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../Controller/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const router = express.Router()


router.route('/products').get(getAllProducts)     //get all the products 

router.route('/product/:id').get(getSingleProduct)     //get single a product

router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProducts)     //create a product

router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts)     //update a product

router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)     //delete a product

router.route("/review").put(isAuthenticatedUser, createProductReview);    // create product review 

router.route("/reviews").get(getProductReviews)    // get product review 

router.route("/reviews").delete(isAuthenticatedUser, deleteReview); // delete a product review 

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);    //get all admin products




module.exports = router