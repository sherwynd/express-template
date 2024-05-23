//  Model
const UserModel = require("../../models/auth/userModel");

//  Validation
const {
  validateUser,
  validateUsername,
  validateForgotPasswordUser,
} = require("../../validations/authValidation");

// Service
const authService = require("../../services/auth/authService");

const registerAccount = async (req, res, next) => {
  try {
    //validation
    await validateUser.validateAsync(req.body, { abortEarly: false });

    const { username, nickname, email, password } = req.body;
    //services
    const account = await authService.registerAccount(
      username,
      nickname,
      email,
      password
    );

    return res.status(201).json(account);
  } catch (err) {
    if (
      err.message === "Username already taken." ||
      err.message === "Email already taken."
    ) {
      return res.status(500).send(err.message);
    } else {
      console.error(err);
      return res.status(500).send("Error while registering Account");
    }
  }
};

const getAllAccount = async (req, res) => {
  try {
    const findUserAll = await authService.getAllAccount();
    res.status(200).json(findUserAll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//refId required
const getAccount = async (req, res) => {
  const { refId } = req.body;
  try {
    const findUser = await authService.getAccount(refId);
    res.status(200).json(findUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { accessToken, refreshToken } = await authService.loginAccount(
      username,
      email,
      password
    );
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    if (
      err.message === "User or Email not found" ||
      err.message === "Password does not match"
    ) {
      return res.status(400).send(err.message);
    } else {
      console.error(err);
      return res.status(500).send("Login Failed");
    }
  }
};

const editAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const editedUser = await authService.editAccount(id, body);
    res.status(200).json(editedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Edit Account Failed");
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteUser } = await authService.deleteAccount(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Delete Account Failed");
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send("Authorization header is missing");
    }

    const user = await authService.authenticateToken(authHeader);
    const findUserAll = await UserModel.find();

    req.user = user;
    res.json(findUserAll.filter((user) => user.username === req.user.user));
  } catch (err) {
    if (
      err.message === "Token not provided" ||
      err.message === "Token is not valid"
    ) {
      return res.status(401).send(err.message);
    }
    console.error(err);
    return res.status(500).send("Authentication failed");
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    const { accessToken } = await authService.refreshToken(refreshToken);
    res.json({ accessToken });
  } catch (err) {
    if (
      err.message === "Refresh Token not provided" ||
      err.message === "Refresh Token not found in data"
    ) {
      return res.status(401).send(err.message);
    }
    console.error(err);
    return res.status(500).send("Error refreshing token");
  }
};

const logoutAccount = async (req, res) => {
  try {
    const { token } = req.body;
    await authService.logoutAccount(token);
    res.status(204).send("Token deleted successfully");
  } catch (err) {
    if (err.message === "Can't find Token") {
      return res.status(401).send(err.message);
    }
    console.error(err);
    return res.status(500).send("Error Logging out Account");
  }
};

const findUser = async (req, res) => {
  try {
    await validateUsername.validateAsync(req.body, { abortEarly: false });
    const { username } = req.body;
    const userDetail = await authService.findUserUsername(username);
    res.status(200).send(userDetail);
  } catch (err) {
    console.error(err);
    return res.status(500).send("find User Account Failed");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { origin } = req.headers;
    const resetToken = await authService.forgotPassword(email, origin);
    res.status(201).json({ resetToken });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Forgot Password Failed");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { secretKey, newPassword } = req.body;
    const message = await authService.resetPassword(
      token,
      secretKey,
      newPassword
    );
    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).send("Reset Password Failed");
  }
};

module.exports = {
  registerAccount,
  loginAccount,
  getAllAccount,
  getAccount,
  editAccount,
  deleteAccount,
  authenticateToken,
  logoutAccount,
  refreshToken,
  findUser,
  forgotPassword,
  resetPassword,
};
