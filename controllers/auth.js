
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const passport = require('passport')



const initializePassport = require('../config/auth')
initializePassport(passport, 
  email => user.find(user => user.email === email))

const registerAccount = async (req,res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const tempAcc = new User({
    userName: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    refId: uuidv4()
    })
    try {
      const account = await tempAcc.save();
      res.status(200).json(account);
      } catch (err) {
        handleErrors(res, err);
      }
};

const loginAccount = async (req,res) => {
  // passport.authenticate(req.session
}
 
// Reusable middleware function for handling errors
const handleErrors = async (res, err) => {
  console.log(err);
  res.status(500).json(err);
};  


module.exports = {
  registerAccount,
  loginAccount,
}
