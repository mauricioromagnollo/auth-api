class InternalServerError extends Error {
  constructor () {
    super('Internal server error')
    this.name = 'UnauthorizedError'
  }
}

module.exports = {
  InternalServerError
}
