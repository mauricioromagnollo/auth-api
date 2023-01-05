const validator = require('validator')

class EmailValidator {
  isValidEmail (email) {
    return validator.isEmail(email)
  }
}

module.exports = {
  EmailValidator
}
