import Joi from "joi";
import { bloodGroups } from "../../constants/constants.js";

// Common address schema
const addressSchema = Joi.object({
    street: Joi.string().allow(""),
    city: Joi.string().allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().allow(""),
    zipCode: Joi.string().allow(""),
});

// Sign-up schema
const signUpSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
    }),
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "any.required": "Password is required",
    }),
    bloodGroup: Joi.string().valid(...bloodGroups).required().messages({
        "any.only": `Blood group must be one of ${bloodGroups.join(", ")}`,
        "any.required": "Blood group is required",
    }),
    address: addressSchema.optional(),
    role: Joi.string().optional(),
});

// Sign-in schema
const signInSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
});

export { signInSchema, signUpSchema };
