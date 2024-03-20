const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const checkUsernameExists = async (username) => {
  const user = await UserModel.findOne({ username });
  return Boolean(user);
};

const checkEmailExists = async (email) => {
  const user = await UserModel.findOne({ email });
  return Boolean(user);
};

const registerAccount = async (req) => {
  const hashedPassword = await bcrypt.hash(req.password, 10);
  const newUser = new User({
    username: req.username,
    email: req.email,
    password: hashedPassword,
    refId: uuidv4(),
  });
  const account = await newUser.save();
  res.status(200).json(account);
};

module.exports = {
  checkUsernameExists,
  checkEmailExists,
  registerAccount,
};
