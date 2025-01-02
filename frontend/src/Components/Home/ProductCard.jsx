// import React from 'react'
// import {Link} from "react-router-dom"
// import ReactStar from "react-rating-stars-component"



// const ProductCard = ({product}) => {
//   const options ={
//     edit:false,
//     color:"rgba(20,20,20,0,1)",
//     activeColor:"tomato",
//     size:window.innerWidth <600 ? 20:25,
//     value:product.ratings,
//     inHalf:true
//   }

//   return (
//   <>
  
//   <Link className='productCard'to={`/product/${product._id}`}>
//   <img src={product.images[0].urls} alt={product.name} />
//   <p>{product.name}</p>

//   <div>
//     <ReactStar{ ...options}/> <span>({product.numOfReviews})</span>
//   </div>
//   <span>₹{product.price}</span>
  
//   </Link>
  
//   </>
//   )
// }

// export default ProductCard


import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Check if the product or product.images is undefined or empty
  if (!product || !product.images || product.images.length === 0) {
    return null; // Don't render the component if data is missing
  }

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={product.images[0]?.url || "/placeholder-image.jpg"}
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <span>{`₹${product.price}`}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
