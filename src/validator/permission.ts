import * as Joi from "joi";

export const permissionSchema = Joi.object({
  name: Joi.string().min(4).required().messages({
    "string.base": "first name must be a string",
    "string.empty": "first name cannot be empty field",
    "any.required": "first name is a required field",
  }),
  action: Joi.string().required().min(4).messages({
    "string.base": "last name must be a string",
    "string.empty": "last name cannot be an empty field",
    "any.required": "last name is a required field",
  }),
  subject: Joi.string().min(4).required().messages({
    "string.base": "first name must be a string",
    "string.empty": "first name cannot be empty field",
    "any.required": "first name is a required field",
  }),
});
