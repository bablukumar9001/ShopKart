import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Select, MenuItem } from "@mui/material";
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layouts/Loader/Loader";
import { toast } from "react-toastify"; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError); // Show error toast
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order Updated Successfully"); // Show success toast
      navigate("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError, navigate]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="">Choose Status</MenuItem>
                      {order.orderStatus === "Processing" && (
                        <MenuItem value="Shipped">Shipped</MenuItem>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </Select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading || !status}
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
