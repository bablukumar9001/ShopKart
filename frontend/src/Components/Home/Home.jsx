import React ,{useEffect,Fragment}from 'react'
import { CgMouse } from 'react-icons/cg';
import "../Home/home.css"
import ProductCard from './ProductCard';
import MetaData from '../Layouts/MetaData';
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Layouts/Loader/Loader";
import { useAlert } from "react-alert";


// const product = {
//   name: " black shirt ",
//   price: "4000",
//   images: [{ url: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/g/b/1/l-000001-dhaduk-original-imah3avukk7znv9j.jpeg?q=70&crop=false" }],
//   _id: "2332",
// }


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);


  return (
   
 <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>

   
  )
}

export default Home