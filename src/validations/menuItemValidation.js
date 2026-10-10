const joi = require("joi");
const multer = require("multer");


// Menu categories
const menuCategories = [
    "Appetizers",
    "Main Course",
    "Beverages",
    "Desserts",
    "Sides"
];


// Create Menu Validation
const createValidation = (req, res, next) => {
    const menuValidation = joi.object({
        name: joi.string().min(1).max(200).required(),
        description: joi.string().trim().max(500).allow("").optional(),
        price: joi.number().precision(2).positive().required(),
        category: joi.string()
                        .valid(...menuCategories)                        
                        .insensitive()
                        .trim().required(),
        isAvailable: joi.boolean().default(true),
    });

    const { error, value } = menuValidation.validate(req.body, 
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

// Update Menu Validation
const updateValidation = (req, res, next) => {
    const menuValidation = joi.object({
        name: joi.string().min(1).max(200),
        description: joi.string().trim().max(500).allow(""),
        price: joi.number().precision(2).positive(),
        category: joi.string()
                        .valid(...menuCategories)
                        .insensitive()
                        .trim(),
        isAvailable: joi.boolean(),
    }).min(1);

    const { error, value } = menuValidation.validate(req.body, 
            {
                abortEarly: false,
                stripUnknown: true
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


// Validate Uploaded Image
const fileValidation = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
        message: "Validation Error",
        errors: ['"image" file is required'],
        });
    }


    const fileSchema = joi.object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi.string().valid("image/jpeg", "image/png", "image/webp").required(),
      size: joi.number().max(5 * 1024 * 1024).required(), // 5 MB
      buffer: joi.binary().required(),
    });

    const { error } = fileSchema.validate(req.file, 
        {
            abortEarly: false
        }
    );

    if (error) {
        return res.status(400).json({
        message: "Validation Error",
        errors: error.details.map((d) => d.message),
        });
    }


    next();

}


module.exports = {
    createValidation,
    updateValidation,
    fileValidation
}