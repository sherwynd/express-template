const UserModel = require("../../models/auth/userModel");
const TokenModel = require("../../models/auth/tokenModel");
const SecretKeyModel = require("../../models/auth/secretKeyModel.js");

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const registerAccount = async (username, nickname, email, password) => {
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
    nickname: nickname,
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

const getAccount = async (refId) => {
  if (!refId) throw new Error("refId not provided");
  const getUser = await UserModel.findOne({
    refId: refId,
  });
  if (!getUser) throw new Error("User not found");
  return getUser;
};

const getAccountById = async (id) => {
  const getUser = await UserModel.findById(id);
  if (!getUser) throw new Error("User not found");
  return getUser;
};

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600s",
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

  return new Promise(async (resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        reject(new Error("Token is not valid"));
      } else {
        const findUserAll = await UserModel.find();
        const result = findUserAll.find(
          (userItem) => userItem.username === user.user
        );
        if (!result) {
          reject(new Error("User not found"));
        }
        resolve(result);
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

const logoutAccount = async (refreshToken) => {
  const result = await TokenModel.deleteOne({ refreshToken });
  if (result.deletedCount === 0) {
    throw new Error("Can't find Token");
  } else {
    return "You have been log out";
  }
};

const findUserUsername = async (username) => {
  const result = await UserModel.findOne({ username });
  if (!result) throw error("username not found");
  return result;
};

const findUserEmail = async (email) => {
  const result = await UserModel.findOne({ email });
  if (!result) throw error("Email not found");
  return result;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const forgotPassword = async (email, domain) => {
  const userFP = await UserModel.findOne({ email });
  if (!userFP) throw error("Email not found");
  const resetToken = crypto.randomBytes(20).toString("hex");
  const secretKey = crypto.randomBytes(5).toString("hex");
  userFP.resetPasswordToken = resetToken;
  userFP.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await userFP.save();

  const mailOptions = {
    from: process.env.EMAIL,
    to: userFP.email,
    subject: "Password Reset",
    text:
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `${domain}/resetPassword/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n` +
      `SECRET-KEY:${secretKey}`,
  };

  const newSecret = new SecretKeyModel({
    secretKey: secretKey,
    refId: uuidv4(),
  });
  await newSecret.save();

  await transporter.sendMail(mailOptions);

  return resetToken;
};

const resetPassword = async (token, secretKey, newPassword) => {
  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Password reset token is invalid or has expired.");
  const findSecretKey = await SecretKeyModel.findOne({
    secretKey: secretKey,
  });
  if (!findSecretKey) throw new Error("Incorrect Secret Key. ");
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return "Password reset successful";
};

module.exports = {
  registerAccount,
  loginAccount,
  getAllAccount,
  getAccount,
  getAccountById,
  generateAccessToken,
  generateResetToken,
  editAccount,
  deleteAccount,
  authenticateToken,
  refreshToken,
  logoutAccount,
  findUserUsername,
  findUserEmail,
  forgotPassword,
  resetPassword,
};
