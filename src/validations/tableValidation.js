const joi = require("joi");

// Allowed table statuses
const tableStatuses = [
    "available",
    "reserved",
    "occupied",
    "maintenance"
];

// CREATE TABLE VALIDATION
const createTableValidation = (req, res, next) => {
    const tableSchema = joi.object({
        tableNumber: joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                "number.base": "Table number must be a number",
                "number.integer": "Table number must be a whole number",
                "number.min": "Table number must be at least 1",
                "any.required": "Table number is required"
            }),

        capacity: joi.number()
            .integer()
            .min(1)
            .max(50)
            .required()
            .messages({
                "number.base": "Please provide a valid capacity",
                "number.integer": "Capacity must be a whole number",
                "number.min": "Capacity must be at least 1",
                "number.max": "Capacity cannot exceed 50",
                "any.required": "Capacity is required"
            }),

        status: joi.string()
            .valid(...tableStatuses)
            .default("available")
            .messages({
                "any.only": `Status must be one of: ${tableStatuses.join(", ")}`
            })
    });

    const { error, value } = tableSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
        convert: true
    });

    if (error) {
        return res.status(400).json({
            message: "Validation Error",
            errors: error.details.map(detail => detail.message)
        });
    }

    req.body = value;
    next();
};


// UPDATE TABLE VALIDATION
const updateTableValidation = (req, res, next) => {
    const tableSchema = joi.object({
        tableNumber: joi.number()
            .integer()
            .min(1)
            .messages({
                "number.base": "Table number must be a number",
                "number.integer": "Table number must be a whole number",
                "number.min": "Table number must be at least 1"
            }),

        capacity: joi.number()
            .integer()
            .min(1)
            .max(50)
            .messages({
                "number.base": "Please provide a valid capacity",
                "number.integer": "Capacity must be a whole number",
                "number.min": "Capacity must be at least 1",
                "number.max": "Capacity cannot exceed 50"
            }),

        status: joi.string()
            .valid(...tableStatuses)
            .messages({
                "any.only": `Status must be one of: ${tableStatuses.join(", ")}`
            })
    })
    .min(1)
    .messages({
        "object.min": "Provide at least one field to update"
    });

    const { error, value } = tableSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
        convert: true
    });

    if (error) {
        return res.status(400).json({
            message: "Validation Error",
            errors: error.details.map(detail => detail.message)
        });
    }

    req.body = value;
    next();
};


module.exports = {
    createTableValidation,
    updateTableValidation
};
