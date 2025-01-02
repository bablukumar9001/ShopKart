import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../Layouts/MetaData";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL params

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm)); // Pass token and form data
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <Box
            className="resetPasswordContainer"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Box className="resetPasswordBox" p={3} width="400px" boxShadow={3}>
              <Typography variant="h5" component="h2" textAlign="center" mb={2}>
                Reset Password
              </Typography>
              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <LockOpenIcon style={{ marginRight: "8px" }} />
                      ),
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <LockIcon style={{ marginRight: "8px" }} />
                      ),
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="resetPasswordBtn"
                >
                  Update
                </Button>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
