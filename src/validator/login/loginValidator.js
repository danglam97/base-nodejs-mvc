const Joi = require("joi");

const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email cannot be empty",
        "string.required": "Email is required"
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password không được bỏ trống", // Trường hợp chuỗi rỗng
        "string.min": "Password phải có ít nhất 6 ký tự", // Trường hợp chuỗi ngắn hơn 6 ký tự
        "any.required": "Password là bắt buộc" // Trường hợp trường không có trong body
    })
});
module.exports = loginValidation;
