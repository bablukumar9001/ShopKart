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
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

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
      <div className="app-container">
        <ScrollToTop />
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/process/payment" element={<Payment />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/order/:id" element={<ProcessOrder />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/reviews" element={<ProductReviews />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
