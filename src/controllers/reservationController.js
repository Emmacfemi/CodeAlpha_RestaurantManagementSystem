const ReservationService = require("../services/reservationService");


// Create Reservation
const createReservation = async (req, res, next) => {
    try {
        const {        
            table,
            reservationDate,
            reservationTime,
            numberOfGuests,
            status
        } = req.body;
    
        const newReservation = await ReservationService.createReservation(
            {
                user: req.user.Id,
                table,
                reservationDate,
                reservationTime,
                numberOfGuests,
                status
            }       
        );
    
        return res.status(201).json({
            message: `Reservation created successfully`,
            reservation: newReservation
        });
        
    } catch (error) {
        next(error);
        
    }

}


// Get Reservation BY ID
const getReservationById = async (req, res, next) => {
    try {
        const reservation = await ReservationService.getReservationById(
            req.params.id
        );
    
        if(!reservation){
            return res.status(404).json({
                message: `Reservation not found`
            });
        }
    
        return res.status(200).json({
            message:  `Reservation fetched successfully`,
            reservation
        });
        
    } catch (error) {
        next(error);
        
    }
}


// Get Reservation By User 
const getReservationByUser = async (req, res, next) => {
    try {
        const reservation = await ReservationService.getReservationByUser(
            req.user.Id,
            req.params.id,
        );
    
        if(!reservation){
            return res.status(404).json({
                message: `No Reservation found for this user`
            });
        }
    
        return res.status(200).json({
            message: `User Reservation fetched successfully`,
            reservation
        });
        
    } catch (error) {
        next(error);
        
    }

}


// Get All Reservations
const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await ReservationService.getAllReservations();

        return res.status(200).json({
            mesasge: `All reservations fectched successfully`,
            reservations
        });

    } catch (error) {
        next(error);
        
    }
}


// Update Reservation
const updateReservation = async (req, res, next) => {
    try {
        const updatedReservation = await ReservationService.updateReservation(
            req.params.id,
            req.user.Id,
            req.body
        );

        if(!updatedReservation){
            return res.status(404).json({
                message: `Reservation not found`,
                
            });
        }

        return res.status(200).json({
            message: `Reservation has been updated successfully`,
            reservation: updatedReservation
        });
        
    } catch (error) {
        next(error);
        
    }
}


// Delete Reservation
const deleteReservation = async (req, res, next) => {
    try {
        const deletedReservation = await ReservationService.deleteReservation(
            req.user.Id,
            req.params.id,
        );

        if(!deletedReservation){
            return res.status(404).json({
                message: `Reservation not found`,
                
            });
        }

        return res.status(200).json({
            message: `Reservation deleted successfully`,
            reservation: deletedReservation
        })
        
    } catch (error) {
        next(error);
        
    }
}


module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    getReservationByUser,
    updateReservation,
    deleteReservation,
}