import Joi from "joi";
import { bloodGroups, urgencyLevels } from "../../constants/constants.js";

const createBloodRequestSchema = Joi.object({
    isForSelf: Joi.boolean().required().messages({
        "any.required": "Please specify if the request is for yourself",
    }),
    bloodGroup: Joi.string().valid(...bloodGroups).required().messages({
        "any.only": `Blood group must be one of: ${bloodGroups.join(", ")}`,
        "any.required": "Blood group is required",
    }),
    numberOfDonors: Joi.number().integer().min(1).max(10).required().messages({
        "number.base": "Number of donors must be a number",
        "number.min": "At least 1 donor must be requested",
        "number.max": "At max 10 donors for free tier",
        "any.required": "Number of donors is required",
    }),
    city: Joi.string().trim().required().messages({
        "string.empty": "City is required",
        "any.required": "City is required",
    }),
    hospital: Joi.string().allow("").trim(),
    urgencyLevel: Joi.string().valid(...urgencyLevels).required().messages({
        "any.only": `Urgency level must be one of: ${urgencyLevels.join(", ")}`,
        "any.required": "Urgency level is required",
    }),
    contactNumber: Joi.string().pattern(/^[0-9]{9,15}$/).optional().allow("").messages({
        "string.pattern.base": "Contact number must be between 9 to 15 digits",
    }),
    message: Joi.string().allow("").max(500).messages({
        "string.max": "Message should not exceed 500 characters",
    }),
});

export { createBloodRequestSchema };