const joi = require("joi");


// CREATE USER VALIDATION
const postValidationSchema = joi.object({
    name: joi.string().min(7).required(),

    email: joi.string().email().lowercase().required(),

    password: joi.string().min(12).max(15).required(),

    role: joi.string()
                .valid(
                    'customer',
                    'staff',
                    'admin'
                )
                .default("customer")
                
});

const createValidation = (req, res, next) => {
    const { error, value } = postValidationSchema.validate(req.body,
        {
            abortEarly: false,
            stripUnknown: true,
        }
    );

    if(error){
        return res.status(400).json({
            message: `Validation Error`,
            errors: error.details.map(
                (detail) => detail.message
            ),
        });
    }

    req.body = value;

    next();
}


// UPDATE USER VALIDATION
const updateValidationSchema = joi.object({
    name: joi.string().min(7),

    email: joi.string().email(),

    password: joi.string().min(12).max(15),

    role: joi.string()
                .valid(
                    'customer',
                    'staff',
                    'admin'
                ),               

}).min(1);


const updateValidation = (req, res, next) => {
    const { error, value } = updateValidationSchema.validate(req.body,
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
            )
        });
    }

    req.body = value;

    next();
}


const loginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const loginValidation = (req, res, next) => {
    const { error, value } = loginValidationSchema.validate(req.body,
        {
            abortEarly: false,
            stripUnknown: true,
        }
    );

    if(error){
        return res.status(400).json({
            message: `Validation Error`,
            errors: error.details.map(
                (detail) => detail.message
            )
        });
    }

    req.body = value;

    next();
}

module.exports = {
    createValidation,
    updateValidation,
    loginValidation
}