const ReservationModel = require("../models/reservationModel");

// Create Reservation
const createReservation = async (reservationData) => {
    const newReservation = new ReservationModel({
        ...reservationData
    });

    await newReservation.save();

    return newReservation;

}


// Get Reservation BY ID
const getReservationById = async (reservationId) => {
    const reservation = await ReservationModel.findById(
        reservationId
    );

    if(!reservation){
        return null;
    }

    return reservation;
}


// Get all Reservations
const getAllReservations = async (page = 1, limit = 10) => {
    const skip = ( page - 1 ) * limit

    const reservations = await ReservationModel.find({})
                            .sort({ createdAt: -1})
                            .limit(limit)
                            .skip(skip)
    
    return reservations;
}


// Get Reservation by User
const getReservationByUser = async (userId, reservationId) => {
    const reservation = await ReservationModel.findOne(
        {
            _id: reservationId,
            user: userId
        }
    );

    if(!reservation){
        return null;
    }

    return reservation;
}


// Update Reservation
const updateReservation = async (reservationId, userId, reservationData) => {
    const reservation = await ReservationModel.findOne(
        {
            _id: reservationId,
            user: userId
        }
    );

    if(!reservation){
        return null;
    }

    const updatedReservation = await ReservationModel.findOneAndUpdate(
        {
            _id: reservationId,
            user: userId,
        },

        {
            
            ...reservationData
        },

        {
            new: true,
            runValidators: true
        }

    );

    return updatedReservation;

}


// Delete Reservation
const deleteReservation = async (reservationData, userId, reservationId) => {

    const deletedReservation = await ReservationModel.findOneAndDelete(
        {
            _id: reservationId,
            user: userId,
        },

    );

    return deletedReservation;

}


module.exports = {
    createReservation,
    getReservationById,
    getAllReservations,
    getReservationByUser,
    updateReservation,
    deleteReservation
}