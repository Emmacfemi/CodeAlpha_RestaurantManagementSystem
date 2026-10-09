require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");


const errorHandler = require("./middlewares/errorMiddleware");
const logError = require("./middlewares/loggerMiddleware");


const userRoutes = require("./routes/userRoutes");
const tableRoutes = require("./routes/tableRoute");
const reservationRoutes = require("./routes/reservationRoute");
const orderRoutes = require("./routes/orderRoute");
const menuRoutes = require("./routes/menuRoute");
const inventoryRoutes = require("./routes/inventoryRoute");



const app = express();


// Middleware
app.use(express.json());
app.use(cors());


// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Restaurant Management API is running"
    });
});


// Routes
app.use("/api/users", userRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/inventory", inventoryRoutes);



// Global Error Middleware
app.use(logError);
app.use(errorHandler);



module.exports = app;