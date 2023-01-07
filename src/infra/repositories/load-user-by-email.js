const { MissingParamError } = require('../../utils/errors')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async exec (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    return this.userModel.findOne({
      email
    }, {
      projection: {
        password: 1
      }
    })
  }
}

module.exports = {
  LoadUserByEmailRepository
}
