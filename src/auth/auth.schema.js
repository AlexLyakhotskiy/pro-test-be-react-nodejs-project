const Joi = require('joi');

exports.signupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

exports.loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});
