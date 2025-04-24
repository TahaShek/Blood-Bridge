import Joi from "joi";
import { bloodGroups, ROLES } from "../../constants/constants.js";

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
    phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15)
    .required()
    .messages({
        "string.empty": "Phone Number is required",
        "string.pattern.base": "Phone Number must only contain digits",
        "string.min": "Phone Number must be at least 9 digits",
        "string.max": "Phone Number must be no more than 15 digits",
        "any.required": "Phone Number is required",
    }),
    isDonating: Joi.boolean().optional(),
    bloodGroup: Joi.string().valid(...bloodGroups).required().messages({
        "any.only": `Blood group must be one of ${bloodGroups.join(", ")}`,
        "any.required": "Blood group is required",
    }),
    address: addressSchema.optional(),
    role: Joi.string().valid(...Object.values(ROLES)).optional(),
});

// Sign-in schema
const signInSchema = Joi.object({
    phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15)
    .required()
    .messages({
        "string.pattern.base": "Phone Number must only contain digits",
        "string.min": "Phone Number must be at least 9 digits",
        "string.max": "Phone Number must be no more than 15 digits",
        "any.required": "Phone Number is required",
    }),
});

export { signInSchema, signUpSchema };
