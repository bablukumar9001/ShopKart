import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import store from "./store";
import { loadUser } from "./actions/userAction";

import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import ScrollToTop from "./Components/Layouts/ScrollToTop";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/Product/ProductDetails";
import Products from "./Components/Product/Products";
import Search from "./Components/Product/Search";
import LoginSignUp from "./Components/user/LoginSignUp";
import UserOptions from "./Components/Layouts/Header/UserOptions";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Profile from "./Components/user/Profile";
import UpdateProfile from "./Components/user/UpdateProfile";

import "../src/App.css";
import ForgotPassword from "./Components/user/ForgotPassword";
import UpdatePassword from "./Components/user/UpdatePassword";
import ResetPassword from "./Components/user/ResetPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./Components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import OrderSuccess from "./Component/Cart/OrderSuccess";
import OrderSuccess from './Components/Cart/OrderSuccess';
import MyOrders from "./Components/Order/MyOrders";
import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import OrderList from "./Components/Admin/OrderList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UsersList from "./Components/Admin/UsersList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";

const API_BASE_URL = import.meta.env.VITE_BASE_URL  

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/stripeapikey`, {
        withCredentials: true, // Ensures cookies are sent with the request
      });
  
      if (data?.stripeApiKey) {
        setStripeApiKey(data.stripeApiKey);
      } else {
        console.error("Stripe API key not found in the response:", data);
      }
    } catch (error) {
      console.error("Failed to fetch Stripe API key:", error.message);
      // Optionally, you can set an error state or show a message to the user
    }
  }
  

  useEffect(() => {
    // Load custom fonts
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // Load user data from store
    store.dispatch(loadUser());

    // Get Stripe API key
    getStripeApiKey();
  }, []);

  //  console.log("stripeeeeee apikey",stripeApiKey);
   


  return (
    <Router>
      {/* Ensure the page scrolls to the top on route changes */}
      <ScrollToTop />

      {/* Header: Always Visible */}
      <Header />

      {/* User Options: Visible if authenticated */}
      {isAuthenticated && <UserOptions user={user} />}

      {/* Stripe Elements: Only visible if stripeApiKey is available */}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          </Routes>
        </Elements>
      )}

      {/* Main Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        {/* <Route path="/demo" element={<BannerCanvas />} /> */}

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={< MyOrders/>} />
          <Route path="/order/:id" element={< OrderDetails/>} />

          {/* admin routes  */}
          <Route  path="/admin/dashboard"   isAdmin={true}  element={< Dashboard/>} />
          <Route  path="/admin/products"   isAdmin={true}  element={< ProductList/>} />
          <Route  path="/admin/product"   isAdmin={true}  element={< NewProduct/>} />
          <Route  path="/admin/product/:id"   isAdmin={true}  element={< UpdateProduct/>} />
          <Route  path="/admin/orders"   isAdmin={true}  element={< OrderList/>} />
          <Route  path="/admin/order/:id"   isAdmin={true}  element={< ProcessOrder/>} />
          <Route  path="/admin/users"   isAdmin={true}  element={< UsersList/>} />
          <Route  path="/admin/user/:id"   isAdmin={true}  element={< UpdateUser/>} />
          <Route  path="/admin/reviews"   isAdmin={true}  element={< ProductReviews/>} />
        
        </Route>

        {/* Other Routes */}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Footer: Always Visible */}
      <Footer />
    </Router>
  );
}

export default App;
