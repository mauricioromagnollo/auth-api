class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async exec (email) {
    return this.userModel.findOne({ email })
  }
}

module.exports = {
  LoadUserByEmailRepository
}
