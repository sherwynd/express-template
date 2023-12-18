const Joi = require("joi");

const validateUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .max(30)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  // birth_year: Joi.number()
  //     .integer()
  //     .min(1900)
  //     .max(2013),
});
// .with('username', 'birth_year')
// .xor('password', 'access_token')
// .with('password', 'repeat_password')

module.exports = {
  validateUser,
};
