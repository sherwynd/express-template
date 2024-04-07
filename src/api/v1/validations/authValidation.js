const Joi = require("joi");

const validateUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .max(30)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "my"] } })
    .required(),

  nickname: Joi.string().alphanum().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  repeat_password: Joi.ref("password"),
});

const validateForgotPasswordUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const validateUsername = Joi.object({
  username: Joi.string().required(),
});

module.exports = {
  validateUser,
  validateUsername,
  validateForgotPasswordUser,
};
