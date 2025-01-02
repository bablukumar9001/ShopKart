import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { toast } from "react-toastify"; // Import toast from react-toastify
import { Button, TextField, Select, MenuItem, Typography } from "@mui/material";
import MetaData from "../Layouts/MetaData";
import {
  AccountTree,
  Description,
  Storage,
  AttachMoney,
} from "@mui/icons-material";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error); // Use toast.error instead of alert.error
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully"); // Use toast.success instead of alert.success
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image); // Append each image file to the form data
    });

    dispatch(createProduct(formData)); // Dispatch the createProduct action
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]); // Reset images state
    setImagesPreview([]); // Reset preview state

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]); // Update the preview
          setImages((old) => [...old, file]); // Store the selected files
        }
      };

      reader.readAsDataURL(file); // Read image as base64 for preview
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <Typography variant="h4" gutterBottom>
              Create Product
            </Typography>

            <div>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                required
                inputProps={{ min: 0 }}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <Description />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <AccountTree />
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="">Choose Category</MenuItem>
                {categories.map((cate) => (
                  <MenuItem key={cate} value={cate}>
                    {cate}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <Storage />
              <TextField
                label="Stock"
                type="number"
                variant="outlined"
                fullWidth
                required
                inputProps={{ min: 0 }}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
