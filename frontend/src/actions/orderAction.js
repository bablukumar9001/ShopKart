import { 
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Constructs a full API URL by appending the given path to the base URL.
 * @param {string} path - The API endpoint path (e.g., "/api/v1/order/new").
 * @returns {string} - The full URL.
 */
const getFullUrl = (path) => `${API_BASE_URL}${path}`;

// Helper function to configure headers
const getConfig = (contentType = "application/json") => ({
  headers: {
    "Content-Type": contentType,
  },
});

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = getConfig();
    const { data } = await axios.post(getFullUrl("/api/v1/order/new"), order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(getFullUrl("/api/v1/orders/me"));

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(getFullUrl("/api/v1/admin/orders"));

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = getConfig();
    const { data } = await axios.put(getFullUrl(`/api/v1/admin/order/${id}`), order, config);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(getFullUrl(`/api/v1/admin/order/${id}`));

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(getFullUrl(`/api/v1/order/${id}`));

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
