const Product = require("../models/product")
const ErrorHander = require("../Utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const ApiFeatures = require("../Utils/apifeautres")
const cloudinary = require("cloudinary");

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  // console.log("Query Parameters:", req.query); // Debugging step
  const { ratings } = req.query;
  try {

    const resultPerPage = 4;
    const productsCount = await Product.countDocuments(); // Total product count

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search() // Apply search
      .filter(); // Apply filters

    // Copy the filtered query to calculate filtered products count
    const filteredQuery = apiFeature.query.clone();
    const filteredProductsCount = await filteredQuery.countDocuments(); // Count filtered products

    // Apply pagination on the original query
    apiFeature.pagination(resultPerPage);
    const products = await apiFeature.query; // Execute the final query

    res.status(200).json({
      success: true,
      products,
      productsCount,
      filteredProductsCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// create a product 

exports.createProducts = catchAsyncErrors(async (req, res, next) => {
  // Check if files are uploaded
  if (!req.files || !req.files.images) {
    return res.status(400).json({
      success: false,
      message: "No images uploaded",
    });
  }

  // Handle single or multiple file uploads
  const images = Array.isArray(req.files.images)
    ? req.files.images // Multiple files
    : [req.files.images]; // Single file

    console.log("imges",images.length);
    
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    try {

      console.log("Uploading file:", images[i]);

      const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error("Image upload error:", error); // Log the full error
      const errorMessage =
        error.message || error.response || JSON.stringify(error);
      return res.status(500).json({
        success: false,
        message: `Image upload failed for file ${images[i].name}: ${errorMessage}`,
      });
    }
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to create product: ${err.message}`,
    });
  }
});




// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// update a product --- ADMIN

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let imagesLinks = [];

  console.log(req.files)


  // Check if new images are provided
  if (req.files && req.files.images) {
    // Handle single or multiple file uploads
    const images = Array.isArray(req.files.images)
      ? req.files.images // Multiple files
      : [req.files.images]; // Single file



    // Delete existing images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // Upload new images to Cloudinary
    for (let i = 0; i < images.length; i++) {
      try {
        const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Image upload failed for file ${images[i].name}: ${error.message}`,
        });
      }
    }
  }

  // If new images were uploaded, set them to the request body
  if (imagesLinks.length > 0) {
    req.body.images = imagesLinks;
  } else {
    // If no new images are uploaded, retain the existing images
    req.body.images = product.images;
  }

  // Update other fields in the product
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to update product: ${err.message}`,
    });
  }
});

// delete a product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});


//get single product details

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    // return res.status(404).json({
    //   success: false,
    //   message: "Product not found",
    // });

    return next(new ErrorHander("product not found", 404))
  }
  return res.status(200).json({
    success: true,
    product
  });


})



// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);    // req.query.id    -- product id

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});



exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, id: reviewId } = req.query; // Destructure the query parameters

  // Find the product by the provided productId
  const product = await Product.findById(productId);
  // console.log("prooooooo",product);


  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Convert reviewId to string for a consistent comparison
  const reviewIdStr = reviewId.toString();

  // console.log("reviw",reviewIdStr);


  // Ensure that each review's _id is being converted to a string for comparison
  const reviews = product.reviews.filter((rev) => {
    // Debugging: Uncomment to see actual values being compared
    // console.log("enterrrrrd");

    console.log(`Comparing: ${rev._id.toString()} === ${reviewIdStr}`);
    return rev._id.toString() !== reviewIdStr;
  });

  // If filtering removes all reviews, verify if the product had reviews initially
  // if (reviews.length === product.reviews.length) {
  //   return next(new ErrorHander("Review not found for this product", 404));
  // }


  // console.log("reviewwww",reviews);
  // Calculate the new average rating
  const numOfReviews = reviews.length;
  const avg = reviews.reduce((acc, rev) => acc + rev.rating, 0);
  const ratings = numOfReviews === 0 ? 0 : avg / numOfReviews;

  // Update the product's reviews, ratings, and the number of reviews
  await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  ); -

    res.status(200).json({
      success: true,

    });
});




