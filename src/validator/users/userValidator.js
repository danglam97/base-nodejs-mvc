const Joi = require('joi');

const userValidation = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 30 characters",
        "any.required": "Name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required"
    })
});

module.exports = userValidation;
