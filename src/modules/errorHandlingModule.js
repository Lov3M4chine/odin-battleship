function validateInput(value, type, errorMessage) {
    if (typeof value !== type) {
      throw new Error(errorMessage);
    }
  }

  module.exports = {
    validateInput
  }