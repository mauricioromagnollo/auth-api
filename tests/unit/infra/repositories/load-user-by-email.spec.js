const { randomUUID } = require('crypto')

const { LoadUserByEmailRepository } = require('../../../../src/infra/repositories')

const makeSut = () => {
  const userModelSpy = makeUserModelSpy()
  const sut = new LoadUserByEmailRepository(userModelSpy)

  return {
    sut,
    userModelSpy
  }
}

const makeRandomId = () => {
  return randomUUID()
}

const makeUserModelSpy = () => {
  return {
    users: [
      { _id: '', email: '', password: '' }
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

      const newUser = {
        _id: makeRandomId(),
        email
      }

      this.users.push(newUser)

      return newUser
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
    const addedUser = userModelSpy.insertOne({ email })

    const user = await sut.exec(email)

    expect(user.email).toBe(addedUser.email)
    expect(user).toHaveProperty('_id')
  })
})
