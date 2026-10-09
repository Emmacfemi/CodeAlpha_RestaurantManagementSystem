const joi = require("joi");

// Regex fro 24-hour time format(HH:mm)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const createReservationValidation = (req, res, next) => {
    const reservationValidation = joi.object({
        user: joi.string().required(),

        table: joi.string().required(),
        
        reservationDate: joi.date().iso().greater("now").required(),

        reservationTime: joi.string().pattern(timeRegex).required()
                            .mesasges({
                                "string.pattern.base": "reservationTime must be in HH:mm format (e.g. 14.30) ",
                            }),

        numberOfGuests: joi.number().integer().min(1).max(25).required(),

        status: joi.string()
                    .valid(
                        'pending',
                        'confirmed',
                        'cancelled',
                        'completed'
                    )
                    .default("pending")
                    
    });

    const { error, value } = reservationValidation.validate(
        req.body,
        {
            abortEarly: false,
            stripUnknown: true,
        }
    );

    if(error){
        return res.status(400).json({
            message: "Validation Error",
            errors: error.details.map(
                (detail) => detail.message
            ),
        });
    }

    req.body = value;

    next();
    
}


const updateReservationValidation = (req, res, next) => {
    const reservationValidation = joi.object({
        user: joi.string(),

        table: joi.string(),
        
        reservationDate: joi.date(),

        reservationTime: joi.string().pattern(timeRegex)
                            .mesasges({
                                "string.pattern.base": "reservationTime must be in HH:mm format (e.g. 14.30) ",
                            }),

        numberOfGuests: joi.number().integer().min(1).max(25),

        status: joi.string()
                    .valid(
                        'pending',
                        'confirmed',
                        'cancelled',
                        'completed'
                    )
                    .default("pending")
    }).min(1);

    const { error, value } = reservationValidation.validate(
        req.body,
        {
            abortEarly: false
        }
    );

    if(error){
        return res.status(400).json({
            message: "Validation Error",
            errors: error.details.map(
                (detail) => detail.message
            ),            
        });
    }

    req.body = value;

    next();

}

module.exports = {
    createReservationValidation,
    updateReservationValidation,
}