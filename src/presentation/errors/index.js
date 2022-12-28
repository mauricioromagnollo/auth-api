const { InternalServerError } = require('./internal-server')
const { InvalidParamError } = require('./invalid-param')
const { MissingParamError } = require('./missing-param')
const { UnauthorizedError } = require('./unauthorized')

module.exports = {
  InternalServerError,
  InvalidParamError,
  MissingParamError,
  UnauthorizedError
}
