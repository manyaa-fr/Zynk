const express = require('express');
const { login, logout } = require ("../controllers/authController");
const { signupWithOtp, verifySignupOtp, sendLoginOtp, verifyLoginOtp } = require("../controllers/otpVerification");

const authRouter = express.Router();

authRouter.post('/signup', signupWithOtp);
authRouter.post('/verify-otp', verifySignupOtp);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/login-otp-request', sendLoginOtp);
authRouter.post('/login-otp-verify', verifyLoginOtp);

module.exports = authRouter;
