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
      return res.status(500).json({ message: err.message });
    } else {
      console.log("Error Occur Here :", err);
      return res.status(500).json({ message: err.message });
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
  const { refId } = req.params;
  try {
    const findUser = await authService.getAccount(refId);
    res.status(200).json(findUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAccountById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: err.message });
  try {
    const findUser = await authService.getAccountById(id);
    res.status(200).json(findUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

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
      return res.status(400).json({ message: err.message });
    } else {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
};

const editAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const editedUser = await authService.editAccount(id, body);
    res.status(200).json(editedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteUser } = await authService.deleteAccount(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }
    const user = await authService.authenticateToken(authHeader);
    res.status(200).json(user);
  } catch (err) {
    if (
      err.message === "Token not provided" ||
      err.message === "Token is not valid"
    ) {
      return res.status(401).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: err.message });
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
      return res.status(401).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const logoutAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await authService.logoutAccount(token);
    console.log("Logout result:", result);
    return res.status(204).json({ message: result });
  } catch (err) {
    console.error("Error in logoutAccount:", err);
    if (err.message === "Can't find Token") {
      return res.status(401).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const findUser = async (req, res) => {
  try {
    await validateUsername.validateAsync(req.body, { abortEarly: false });
    const { username } = req.body;
    const userDetail = await authService.findUserUsername(username);
    res.status(200).json(userDetail);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
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
    return res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerAccount,
  loginAccount,
  getAllAccount,
  getAccount,
  getAccountById,
  editAccount,
  deleteAccount,
  authenticateToken,
  logoutAccount,
  refreshToken,
  findUser,
  forgotPassword,
  resetPassword,
};
