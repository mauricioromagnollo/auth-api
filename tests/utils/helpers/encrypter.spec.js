const bcrypt = require('bcrypt')

const { Encrypter } = require('../../../src/utils/helpers')
const { MissingParamError } = require('../../../src/utils/errors')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('should return true if bcrypt returns true', async () => {
    const sut = makeSut()

    const isValid = await sut.compare('any_value', 'hashed_value')

    expect(isValid).toBeTruthy()
  })

  test('should return false if bcrypt returns false', async () => {
    const sut = makeSut()

    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')

    expect(isValid).toBeFalsy()
  })

  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const value = 'any_value'
    const hashedValue = 'hashed_value'

    sut.compare(value, hashedValue)

    expect(bcrypt.value).toBe(value)
    expect(bcrypt.hashedValue).toBe(hashedValue)
  })

  test('should throw if no params are provided', () => {
    const sut = makeSut()

    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hashedValue'))
  })
})
