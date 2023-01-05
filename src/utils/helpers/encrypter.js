const bcrypt = require('bcrypt')
const { MissingParamError } = require('../errors')

class Encrypter {
  async compare (value, hashedValue) {
    if (!value) {
      throw new MissingParamError('value')
    }

    if (!hashedValue) {
      throw new MissingParamError('hashedValue')
    }

    return bcrypt.compare(value, hashedValue)
  }
}

module.exports = {
  Encrypter
}
