const validator = require('validator')

const { MissingParamError } = require('../../../src/utils/errors')
const { EmailValidator } = require('../../../src/utils/helpers')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValidEmail('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('should return false if validator returns true', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValidEmail('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('should call validator with correct email', () => {
    const email = 'any_email@mail.com'
    const sut = makeSut()
    sut.isValidEmail(email)
    expect(validator.email).toBe(email)
  })

  test('should throw if no email is provided', () => {
    const sut = makeSut()

    expect(() => {
      sut.isValidEmail()
    }).toThrow(new MissingParamError('email'))
  })
})
