import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../Layouts/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "../Product/product.css";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";

const categories = [
  "Laptop",
  "mobile",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams(); // Get the route parameter

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);



 

  const { products, loading, error, productsCount ,resultPerPage ,filteredProductsCount } = useSelector( 
    (state) => state.products
  );
    
  // console.log(error);

  const alert = useAlert()
  

let count = filteredProductsCount
   
  // console.log("cccz", resultPerPage,productsCount);
  
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {

    if (error) {
      alert.error(error); // Log or display error messages (optional)
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));

  }, [dispatch, keyword, alert,error,currentPage,price,category,ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <h2 className="productsHeading">All Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
          <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={5000}
            />
          

          <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

            </div>

            
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )} 
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
