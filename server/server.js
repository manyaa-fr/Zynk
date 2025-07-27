const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require('./routes/eventRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');
const {signupWithOtp, verifySignupOtp} = require('./controllers/otpVerification.js')

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use("/auth", authRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/contact', contactRoutes);

// Debug route to test if server is running
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});