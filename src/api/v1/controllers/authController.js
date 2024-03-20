const Token = require("../models/tokenModel");
const jwt = require("jsonwebtoken");

const { validateUser } = require("../validations/authValidation");
const authService = require("../services/authService");

const registerAccount = async (req, res, next) => {
  try {
    await validateUser.validateAsync(req.body, { abortEarly: false });

    const usernameExists = await authService.checkUsernameExists(
      req.body.username
    );
    if (usernameExists) {
      return res.status(400).json({ error: "Username already taken." });
    }

    const emailExists = await authService.checkEmailExists(req.body.email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const account = await authService.registerAccount(req.body);
    return res.status(201).json(account);
  } catch (err) {
    console.error("Error while registering Account.", err.message);
    next(err);
  }
};

const getAllAccount = async (req, res) => {
  try {
    const findUserAll = await User.find();
    res.status(200).json(findUserAll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginAccount = async (req, res) => {
  try {
    const loginUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!loginUser) {
      return res.status(400).send("User or Email not found");
    }
    const loginUsername = { username: loginUser.username };
    if (await bcrypt.compare(req.body.password, loginUser.password)) {
      const accessToken = generateAccessToken(loginUsername);
      const refreshToken = jwt.sign(
        loginUsername,
        process.env.REFRESH_TOKEN_SECRET
      );
      const newToken = new Token({
        refreshToken: refreshToken,
        refId: loginUser.refId,
      });
      await newToken.save();
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(500).send("Login Failed");
    }
  } catch (err) {
    handleErrors(res, err);
  }
};

const editAccount = async (req, res) => {
  try {
    const editUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(editUser);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser == null) {
      res.status(400).send("Cant find User");
    } else {
      res.status(200).json(deleteUser);
    }
  } catch (err) {
    handleErrors(res, err);
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const findUserAll = await User.find();
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).send("Token not provided");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Token is not valid");
      req.user = user;
      res.json(
        findUserAll.filter((user) => user.username == req.user.username)
      );
    });
  } catch (err) {
    handleErrors(res, err);
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};

const generateResetToken = (user) => {
  return jwt.sign(user, process.env.RESET_TOKEN_SECRET, { expiresIn: "3600s" });
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;

    if (refreshToken == null)
      return res.status(401).send("Refresh Token not provided");

    const getToken = await Token.findOne({ refreshToken: req.body.token });

    if (getToken == null)
      return res.status(401).send("Refresh Token not found in data");

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send(err);
      const accessToken = generateAccessToken({ username: user.username });
      res.json({ accessToken: accessToken });
    });
  } catch (err) {
    handleErrors(res, err);
  }
};

const logoutAccount = async (req, res) => {
  try {
    const result = await Token.deleteOne({ token: req.body.token });

    if (result.deletedCount === 0) {
      return res.status(400).send("Can't find Token");
    } else {
      res.status(204).send("Token deleted successfully");
    }
  } catch (err) {
    handleErrors(res, err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    // await validateUser.validateAsync(req.body, { abortEarly: false });
    const result = await User.findOne({ email: req.body });

    if (!result) {
      return res.status(400).send("Can't find email address");
    }
    const resetToken = generateResetToken({ email: user.email });
  } catch (err) {
    handleErrors(res, err);
  }
};

// Reusable middleware function for handling errors
const handleErrors = (res, err) => {
  console.log(err);
  res.status(500).json(err);
};

module.exports = {
  registerAccount,
  loginAccount,
  getAllAccount,
  editAccount,
  deleteAccount,
  authenticateToken,
  generateAccessToken,
  logoutAccount,
  refreshToken,
};
