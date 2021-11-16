/** @format */

const Joi = require("joi");

exports.signupSchema = Joi.object({
  question: Joi.string().required(),
  answers: Joi.array().required(),
});
