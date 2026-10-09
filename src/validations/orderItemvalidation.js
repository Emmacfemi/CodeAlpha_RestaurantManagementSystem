const joi = require('joi');

const createOrderItemValidation = (req, res, next) => {
    const orderItemValidation = joi.object({
        order: joi.string().required(),
        menuItem: joi.string().required(),
        quantity: joi.number().integer().min(1).required(),
        price: joi.number().precision(2).positive().required(),
        // subTotal: joi.number().required()
    });

    const { error, value } = orderItemValidation.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

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


const updateOrderItemValidation = (req, res, next) => {
    const orderItemValidation = joi.object({
        order: joi.string(),
        menuItem: joi.string(),
        quantity: joi.number().integer().min(1),
        price: joi.number().precision(2).positive(),
        // subTotal: joi.number(),
    }).min(1);

    const { error, value } = orderItemValidation.validate(req.body,
        {
            abortEarly: false,
            stripUnknown: true
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
    createOrderItemValidation,
    updateOrderItemValidation
}