const express = require('express');
const { login, logout, signup } = require ("../controllers/authController");

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports = authRouter;
