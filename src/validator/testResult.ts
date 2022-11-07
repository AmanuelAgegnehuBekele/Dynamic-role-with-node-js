import Joi from "joi";

export const testResultSchema = Joi.object({
  result: Joi.number().sign("positive").max(1000).required(),
  studentId: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.forbidden(),
  }),
  graderId: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.forbidden(),
  }),
});
