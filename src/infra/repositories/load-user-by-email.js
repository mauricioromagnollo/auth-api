class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async exec (email) {
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