import Joi from "joi";

export const stringValidation = (field: string, min: number, max: number) => {
  return Joi.string()
    .min(min)
    .max(max)
    .required()
    .messages({
      "string.empty": `${field} nie może być puste`,
      "string.min": `${field} musi zawierać minimum ${min} znaki`,
      "string.max": `${field} musi zawierać maksymalnie ${max} znaków`,
    });
};
