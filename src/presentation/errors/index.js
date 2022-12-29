const { InternalServerError } = require('./internal-server')

const { UnauthorizedError } = require('./unauthorized')

module.exports = {
  InternalServerError,
  UnauthorizedError
}
