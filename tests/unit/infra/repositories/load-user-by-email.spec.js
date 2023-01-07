const { LoadUserByEmailRepository } = require('../../../../src/infra/repositories')

const makeSut = () => {
  const userModelSpy = makeUserModelSpy()
  const sut = new LoadUserByEmailRepository(userModelSpy)

  return {
    sut,
    userModelSpy
  }
}

const makeUserModelSpy = () => {
  return {
    users: [
      { email: '' }
    ],
    findOne ({ email }) {
      const user = this.users.find(user => user.email === email)
      return user ?? null
    },
    insertOne ({ email }) {
      const user = this.findOne({ email })

      if (user) {
        return null
      }

      return this.users.push({ email })
    }
  }
}

describe('LoadUserByEmailRepository', () => {
  test('should return null if no user is not found', async () => {
    const { sut } = makeSut()

    const user = await sut.exec('not_found_email@mail.com')

    expect(user).toBeNull()
  })

  test('should return an user if user is found', async () => {
    const { sut, userModelSpy } = makeSut()
    const email = 'valid_email@mail.com'
    userModelSpy.insertOne({ email })

    const user = await sut.exec(email)

    expect(user.email).toBe(email)
  })
})
