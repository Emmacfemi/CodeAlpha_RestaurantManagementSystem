const joi = require("joi");

const orderItemSchema = joi.object({
  menuItem: joi.string().required(), // MongoDB ObjectId or Item ID
  quantity: joi.number().integer().min(1).required(),
  price: joi.number().precision(2).positive().optional(),
});

const createOrderValidation = (req, res, next) => {
    const orderValidation = joi.object({
        user: joi.string().min(5).max(30).required(),
       
        items: joi.array().items(orderItemSchema).min(1)
                    .messages({
                        "array.min": "An order must contain at least one item",
                    }),
        
        totalAmount: joi.number().precision(2).min(0).required(),
       
        status: joi.string()
                    .valid(
                        'pending',
                        'confirmed',
                        'preparing',
                        'ready',
                        'completed',
                        'cancelled'
                    )
                    .default("pending"),

        orderType: joi.string()
                        .valid(
                            'delivery',
                            'pickup',
                            'dine-in'
                        )
                        .required(),
    });

    const { error, value } = orderValidation.validate(
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

const updateOrderValidation = (req, res, next) => {
    const orderValidation = joi.object({
        user: joi.string().min(5).max(30),
       
        items: joi.array().items(orderItemSchema).min(1)
                    .messages({
                        "array.min": "An order must contain at least one item",
                    }),
        
        totalAmount: joi.number().precision(2).min(0),
       
        status: joi.string()
                    .valid(
                        'pending',
                        'confirmed',
                        'preparing',
                        'ready',
                        'completed',
                        'cancelled'
                    )
                    .default("pending"),

        orderType: joi.string()
                        .valid(
                            'delivery',
                            'pickup',
                            'dine-in'
                        )

    }).min(1);

    const { error, value } = orderValidation.validate(
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

module.exports = {
    createOrderValidation,
    updateOrderValidation
}