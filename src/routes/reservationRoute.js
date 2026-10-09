const express = require("express");

const reservationRoutes = express.Router();

const {
    createReservationValidation,
    updateReservationValidation,
} = require("../validations/reservationValidation");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createReservation,
    getAllReservations,
    getReservationById,
    getReservationByUser,
    updateReservation,
    deleteReservation,
} = require("../controllers/reservationController");


// TEST
reservationRoutes.get("/test", (req, res) => {
    return res.status(200).json({
        message: `Reservations are working well`,
    });
});


// Create Reservation
reservationRoutes.post("/", authMiddleware, createReservationValidation, createReservation);


// Get All Reservations
reservationRoutes.get("/", authMiddleware, getAllReservations);


// Get Reservation By ID
reservationRoutes.get("/:id", authMiddleware, getReservationById);


// Get Reservation by User
reservationRoutes.get("/user/:id", authMiddleware, getReservationByUser);


// Update Reservation
reservationRoutes.put("/:id", authMiddleware, updateReservationValidation, updateReservation);


// Delete Reservation 
reservationRoutes.delete("/:id", authMiddleware, deleteReservation);


module.exports = reservationRoutes;