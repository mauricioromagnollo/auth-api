class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized error')
    this.name = 'UnauthorizedError'
  }
}

module.exports = {
  UnauthorizedError
}
