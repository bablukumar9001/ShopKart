import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../Layouts/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || deleteError) {
      alert.error(error || deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 250, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 120, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      flex: 0.3,
      minWidth: 150,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/product/${params.row.id}`}>
            <Edit />
          </Link>
          <Button onClick={() => deleteProductHandler(params.row.id)}>
            <Delete />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = products
    ? products.map((product) => ({
        id: product._id,
        name: product.name,
        stock: product.Stock,
        price: product.price,
      }))
    : [];

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10} // Adjust this number based on how many rows you want to display per page
            disableSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
