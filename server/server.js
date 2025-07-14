const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require('./routes/eventRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
}));

connectDB();

app.get("/", (req, res) => {
    res.send("Hello! This is the server!");
});

// Routes
app.use("/auth", authRoutes);
app.use('/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});