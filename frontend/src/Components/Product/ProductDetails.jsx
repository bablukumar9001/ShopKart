import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import "./ProductDetails.css";
import ReactStar from "react-rating-stars-component";
import Loader from "../Layouts/Loader/Loader";
import MetaData from "../Layouts/MetaData";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

// Material-UI Carousel
import Carousel from "react-material-ui-carousel";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { newReview } from "../../actions/productAction"; // Correct import for newReview

const ProductDetails = () => {
  const { id } = useParams(); // Access the product ID using useParams
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product = {}, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id); // Use the id from useParams

    dispatch(newReview(myForm)); // Dispatch the new review action

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors()); // Corrected clearErrors call
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors()); // Corrected clearErrors call
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id)); // Fetch product details using the id
  }, [dispatch, id, error, alert, reviewError, success]);

  if (loading) return <Loader />;
  if (error) return <h2>Error: {error}</h2>;

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings || 0,
    isHalf: true,
  };

  return (
    <Fragment>
      <MetaData title={`${product.name || "Product"} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          {/* Carousel Section */}
          <Carousel>
            {product.images?.map((item, i) => (
              <img
                className="CarouselImage carouselItem"
                key={i}
                src={item.url}
                alt={`Slide ${i}`}
              />
            ))}
          </Carousel>
        </div>

        {/* Product Details Section */}
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>

          <div className="detailsBlock-2">
            <ReactStar {...options} />
            <span>({product.numOfReviews || 0} Reviews)</span>
          </div>

          <div className="detailsBlock-3">
            <h1>{`₹${product.price || 0}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={product.Stock < 1}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "Out of Stock" : "In Stock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product.description || "No description available."}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />
          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reviews Section */}
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews?.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
};

export default ProductDetails;
