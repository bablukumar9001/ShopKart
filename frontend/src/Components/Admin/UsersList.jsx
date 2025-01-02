import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Updated DataGrid import
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Updated toasts import
import { Button } from "@mui/material"; // Updated Material-UI imports
import MetaData from "../Layouts/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // Updated icons import
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Loader from "../Layouts/Loader/Loader"; // Optional loading component

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); // Updated history to useNavigate

  const { error, users, loading } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // Replaced alert with toast for error
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError); // Replaced alert with toast for error
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message); // Replaced alert with toast for success
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.row.role === "admin" ? "greenColor" : "redColor", // Updated syntax
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.row.id}`}>
            <EditIcon />
          </Link>

          <Button onClick={() => deleteUserHandler(params.row.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = users
    ? users.map((item) => ({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      }))
    : [];

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          {loading ? (
            <Loader /> // You can implement a loader here
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
