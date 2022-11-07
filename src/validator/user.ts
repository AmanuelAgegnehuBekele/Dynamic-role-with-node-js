import * as Joi from "joi";

export const createUserValidation = Joi.object({
  firstName: Joi.string().min(4).required().messages({
    "string.base": "first name must be a string",
    "string.empty": "first name cannot be empty field",
    "string.min": "first name must be longer than 4 characters",
    "any.required": "first name is a required field",
  }),
  lastName: Joi.string().required().min(4).messages({
    "string.base": "last name must be a string",
    "string.empty": "last name cannot be an empty field",
    "string.min": "last name must be longer than 4 characters",
    "any.required": "last name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "email must be a string",
    "string.email": "must enter a valid email",
    "string.empty": "email is required",
    "any.required": "email is a required field",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "password must be a string",
    "string.empty": "password is required",
    "string.min": "password must be longer than 6 characters",
    "any.required": "password is a required field",
  }),
  role: Joi.string().min(4).required().messages({
    "string.base": "role must be a string",
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email must be a string",
    "string.email": "the email format is invalid",
    "string.empty": "The email field is required",
    "any.required": "email is a required field",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "password must be a string",
    "string.empty": "The password field is required",
    "string.min": "The password must at least 6 characters long",
    "any.required": "password is a required field",
  }),
});

export const userIdValidation = Joi.string().required();
