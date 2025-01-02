const express = require("express")
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword , getUserDetails, updatePassword, getAllUser, updateProfile, getSingleUser, updateUserRole, deleteUser} = require("../Controller/userController")
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')


router.route("/register").post(registerUser)   // register a user

router.route("/login").post(loginUser)   //  login a user

router.route("/password/forgot").post(forgotPassword);   // forgot password

router.route("/password/reset/:token").put(resetPassword);   // reset password

router.route("/logout").get(logoutUser)   //  Logout a user 

router.route("/admin/users") .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);   //get all user detail -- admin

router.route("/password/update").put(isAuthenticatedUser, updatePassword);   //update  user password

router.route("/me").get(isAuthenticatedUser, getUserDetails);    //get user details

router.route("/me/update").put(isAuthenticatedUser, updateProfile); // update user profile

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)  // get single user data --- admin

router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)  // update  user role --- admin

router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)  // delete user  --- admin

module.exports = router