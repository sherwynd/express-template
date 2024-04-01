const UserModel = require("../models/userModel");
const TokenModel = require("../models/tokenModel");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const registerAccount = async (username, email, password) => {
  const existedUsername = await UserModel.findOne({ username });
  if (existedUsername) {
    throw new Error("Username already taken.");
  }
  const existedEmail = await UserModel.findOne({ email });
  if (existedEmail) {
    throw new Error("Email already taken.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username: username,
    email: email,
    password: hashedPassword,
    refId: uuidv4(),
  });
  const account = await newUser.save();
  return account;
};

const loginAccount = async (username, email, password) => {
  const loginUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (!loginUser) {
    throw new Error("User or Email not found");
  }

  const isMatch = await bcrypt.compare(password, loginUser.password);
  if (!isMatch) {
    throw new Error("Password does not match");
  }

  const accessToken = generateAccessToken(loginUser.username);
  const refreshToken = jwt.sign(
    loginUser.username,
    process.env.REFRESH_TOKEN_SECRET
  );

  const newToken = new TokenModel({
    refreshToken: refreshToken,
    refId: loginUser.refId,
  });

  await newToken.save();

  return { accessToken, refreshToken };
};

const getAllAccount = async () => {
  return await UserModel.find();
};

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });
};

const generateResetToken = (user) => {
  return jwt.sign({ user }, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "3600s",
  });
};

const editAccount = async (id, body) => {
  return await UserModel.findByIdAndUpdate(id, { $set: body }, { new: true });
};

const deleteAccount = async (id) => {
  const deleteUser = await User.findByIdAndDelete(id);
  if (deleteUser == null) {
    throw new Error("Cant find User");
  }
  return deleteUser;
};

const authenticateToken = async (authHeader) => {
  if (!authHeader) {
    throw new Error("Token not provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token not provided");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        reject(new Error("Token is not valid"));
      } else {
        resolve(user);
      }
    });
  });
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh Token not provided");
  }

  const tokenData = await TokenModel.findOne({ refreshToken });
  if (!tokenData) {
    throw new Error("Refresh Token not found in data");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        reject(err);
      } else {
        const accessToken = generateAccessToken({ user });
        resolve({ accessToken });
      }
    });
  });
};

const logoutAccount = async (token) => {
  const result = await TokenModel.deleteOne({ token });
  if (result.deletedCount === 0) {
    throw new Error("Can't find Token");
  } else {
    return true;
  }
};

const forgotPassword = async (req, res) => {};

module.exports = {
  registerAccount,
  loginAccount,
  getAllAccount,
  generateAccessToken,
  generateResetToken,
  editAccount,
  deleteAccount,
  authenticateToken,
  refreshToken,
  logoutAccount,
  forgotPassword,
};
