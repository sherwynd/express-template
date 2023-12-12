
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const { validateUser } = require('../validations/auth')

const registerAccount = async (req,res) => {
    try {
      const validationErrors = validateUser(req.body)
      if(validationErrors) {
        return res.status(400).json({ errors: validationErrors });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        refId: uuidv4()
      })
      const account = await newUser.save()
      res.status(200).json(account)
      } catch (err) {
        handleErrors(res, err)
      }
}

const getAllAccount = async (req,res) => {
  try{
      const findUserAll = await User.find()
      res.status(200).json(findUserAll)
     }catch(err){
      res.status(400).json({message:err.message})
  }
}

const loginAccount = async (req,res) => {
  const loginUser = await User.findOne({ userName: req.body.username })
  if(loginUser == null){
    return res.status(400).send('User not found')
  }
  try{
    if(await bcrypt.compare (req.body.password, loginUser.password)) {
      res.send('Login Success')
    } else {
      res.status(500).send('Login Failed')
    }
  } catch (err) {
    handleErrors(res, err)
  }
}
 
const editAccount = async (req,res) => {
  try {
      const editUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(editUser)
    } catch (err) {
      handleErrors(res, err)
    }
}

const deleteAccount = async (req,res) => {
  try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      if(deleteUser == null){
        res.status(400).send('Cant find User')
      } else {
        res.status(200).json(deleteUser)
      }
    }
    catch (err) {
      handleErrors(res, err);
    }
}

// Reusable middleware function for handling errors
const handleErrors = async (res, err) => {
  console.log(err)
  res.status(500).json(err)
}


module.exports = {
  registerAccount,
  loginAccount,
  getAllAccount,
  editAccount,
  deleteAccount,
}
