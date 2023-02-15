const express = require("express");
const router = express.Router();
const cleanBody = require("../middlewares/clean");
const AuthController = require("../controllers/userController");
//Define endpoints
router.post("/signup", cleanBody, AuthController.Signup);
router.post("/login", cleanBody, AuthController.Login);
router.patch("/activate", cleanBody, AuthController.Activate);
router.patch("/forgot",cleanBody, AuthController.ForgotPassword);
router.patch("/reset",cleanBody,AuthController.ResetPassword);
module.exports = router;