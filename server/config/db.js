const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Database connection error:", error.message);
        console.log("Server will continue without database connection");
    }
};

module.exports = connectDB;
