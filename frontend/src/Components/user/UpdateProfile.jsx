import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Layouts/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../Layouts/MetaData";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null); // Store the file object
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // Form submission handler
  const updateProfileSubmit = (e) => {
    e.preventDefault();

  

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    // Append avatar only if a file is selected

    if (avatar) {
      myForm.set("avatar", avatar);
    } else {
      console.warn("No avatar selected for update.");
    }

    // Log FormData contents
  // for (let pair of myForm.entries()) {
  //   console.log(pair[0], pair[1]); // Log each key-value pair in FormData
  // }

    // console.log(avatar)
    // console.log(myForm)

    dispatch(updateProfile(myForm));
  };

  // File input change handler
  const updateProfileDataChange = (e) => {
    const file = e.target.files[0];
  
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
  
    // Ensure the selected file is an image
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload an image (JPEG/PNG).");
      return;
    }
  
    // Create a FileReader instance
    const reader = new FileReader();
  
    // Handle file read
    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setAvatarPreview(reader.result); // Set the preview
        setAvatar(file); // Store the actual file
      }
    };
  
    // Read the file as a data URL
    reader.readAsDataURL(file);
  };
  
  // Load user data on component mount and handle updates
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar?.url || "/Profile.png");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser()); // Reload user data
      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
