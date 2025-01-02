import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../Layouts/MetaData";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.products);
  const { orders = [] } = useSelector((state) => state.allOrders);
  const { users = [] } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const outOfStock = products.filter((item) => item.Stock === 0).length;
  const totalAmount = orders.reduce((sum, item) => sum + item.totalPrice, 0);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "tomato",
        borderColor: "rgb(197, 72, 49)",
        data: [0, totalAmount],
        tension: 0.4,
      },
    ],
  };

  const doughnutState = {
    label: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || "";
            return `${label}: ${value}`; // Customize tooltip content
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  // Only render the charts if data is available
  if (!products.length || !orders.length || !users.length) {
    return (
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />
        <div className="dashboardContainer">
          <Typography variant="h4" component="h1" gutterBottom>
            Loading Dashboard...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div className="totalAmountBox">
            <p>
              Total Amount <br /> ₹{totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
