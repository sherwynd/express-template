const Template = require("../models/template");

// Getting all
const getAllTemplate = async (req, res) => {
  try {
    const template = await Template.find();
    res.status(200).json(template);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Getting one
const getIdTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    res.status(200).json(template);
  } catch (err) {
    handleErrors(res, err);
  }
};

// Creating one
const createTemplate = async (req, res) => {
  const template = new Template({
    templateName: req.body.templateName,
    age: req.body.age,
    createdDateTime: req.body.createdDateTime,
  });
  try {
    const newTemplate = await template.save();
    res.status(200).json(newTemplate);
  } catch (err) {
    handleErrors(res, err);
  }
};

// Updating one
const updateTemplate = async (req, res) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTemplate);
  } catch (err) {
    handleErrors(res, err);
  }
};

// Deleting one
const deleteTemplate = async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTemplate);
  } catch (err) {
    handleErrors(res, err);
  }
};

module.exports = {
  getAllTemplate,
  getIdTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
