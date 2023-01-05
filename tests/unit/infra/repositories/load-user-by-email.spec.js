const { LoadUserByEmailRepository } = require('../../../../src/infra/repositories')

describe('LoadUserByEmailRepository', () => {
  test('should return null if no user is found', async () => {
    const sut = new LoadUserByEmailRepository()

    const user = await sut.exec('invalid_email@mail.com')

    expect(user).toBeNull()
  })
})
