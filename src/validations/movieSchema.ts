import Joi from "joi";

export const movieSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  imageUrl: Joi.string().uri().required().messages({
    "string.empty": "Image URL is required",
    "string.uri": "Invalid URL",
  }),
  isVisible: Joi.boolean().required().messages({
    "boolean.base": "Visibility must be a boolean",
  }),
});
