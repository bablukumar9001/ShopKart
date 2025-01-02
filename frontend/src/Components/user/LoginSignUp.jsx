import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Layouts/Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch for actions
  const alert = useAlert(); // Initialize react-alert for notifications
  const navigate = useNavigate(); // For programmatic navigation
  const location = useLocation(); // Get the current route location

  // Get user-related state from Redux store
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  // Refs for tab switching
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // State for login inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for registration inputs
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user; // Destructure user object

  // State for avatar (profile image) and preview
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // Handle login form submission
  const loginSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    dispatch(login(loginEmail, loginPassword)); // Dispatch login action
  };

  // Handle registration form submission
  const registerSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    const myForm = new FormData(); // Create a FormData object for file handling
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm)); // Dispatch register action
  };

  // Handle changes in registration input fields
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader(); // Read uploaded file
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result); // Preview image
          setAvatar(reader.result); // Set avatar
        }
      };
      reader.readAsDataURL(e.target.files[0]); // Convert file to Base64
    } else {
      setUser({ ...user, [e.target.name]: e.target.value }); // Update user state
    }
  };

  // Determine redirection route after login/register
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  // Effect to handle errors and authentication state changes
  useEffect(() => {
    if (error) {
      alert.error(error); // Show error notification
      dispatch(clearErrors()); // Clear errors in Redux state
    }

    if (isAuthenticated) {
      navigate(redirect); // Redirect to specified route
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  // Handle tab switching between login and register
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader /> // Show loader while request is processing
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              {/* Toggle between login and register tabs */}
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            {/* Login Form */}
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password?</Link> {/* Forgot password link */}
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            {/* Register Form */}
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              {/* Avatar Upload */}
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
