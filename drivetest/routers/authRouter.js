const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// login
router.get("/auth/login", authController.getLoginPage);
router.post("/auth/postSignIn", authController.postSignInHandler);
router.get("/auth/logout", authController.postLogout);

// sign up
router.post("/auth/signup", authController.postSignup);

module.exports = router;
