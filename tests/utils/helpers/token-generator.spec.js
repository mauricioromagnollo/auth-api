const jwt = require('jsonwebtoken')

class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    return jwt.sign(id, this.secret)
  }
}

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
})
