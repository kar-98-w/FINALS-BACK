const express = require("express");

const auth = require('../auth'); // Adjust path if needed

// Express routing component
const router = express.Router();
const userController = require("../controllers/User-Controllers.js");
const { verify } = require("../auth.js");

// User Registration
router.post("/register", userController.registerUser);

// User Login
router.post("/login", userController.loginUser);

// Check if email exists
router.post("/check-email", userController.checkEmail);

// Get user details
router.post("/details", verify, userController.getProfile);

// Get user details
router.post("/enroll", verify, userController.enroll);

// Route for updating password
router.put('/update-password', auth.verifyToken, userController.updatePassword);  // auth.verifyToken ensures the user is authenticated






module.exports = router;