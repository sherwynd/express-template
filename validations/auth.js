

function validateUser(userData) {
    const errors = {};
    // Perform your validation logic and populate the errors object
  
    // Return null or the errors object depending on whether there are errors
    return Object.keys(errors).length === 0 ? null : errors;
  }

  module.exports = {
    validateUser,
  }