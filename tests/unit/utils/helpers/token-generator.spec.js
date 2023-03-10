const jwt = require('jsonwebtoken')

const { MissingParamError } = require('../../../../src/utils/errors')
const { TokenGenerator } = require('../../../../src/utils/helpers')

const makeSut = () => {
  return new TokenGenerator('any_secret')
}

describe('Token Generator', () => {
  test('should return true if jwt returns null', async () => {
    const sut = makeSut()

    jwt.token = null
    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })

  test('should return true if jwt returns null', async () => {
    const sut = makeSut()

    const token = await sut.generate('any_id')

    expect(token).toBe(jwt.token)
  })

  test('should call jwt with correct values', async () => {
    const sut = makeSut()

    await sut.generate('any_id')

    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })

  test('should throw if no secret is provided', () => {
    const sut = new TokenGenerator()

    const promise = sut.generate('any_id')

    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('should throw if no id is provided', () => {
    const sut = makeSut()

    const promise = sut.generate()

    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
