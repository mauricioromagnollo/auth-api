const { DatabaseHelper } = require('../../../../src/infra/helpers/database')
const { LoadUserByEmailRepository } = require('../../../../src/infra/repositories/load-user-by-email')

let databaseHelper = null
let db = null

const USERS_COLLECTION = 'users'
const DATABASE_NAME = 'auth_api_test'
const DATABASE_CONNECTION_URL = `mongodb://root:root@localhost:27017/${DATABASE_NAME}?authSource=admin`

const makeSut = () => {
  const userModel = db.collection(USERS_COLLECTION)
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    sut,
    userModel
  }
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    databaseHelper = new DatabaseHelper()
    await databaseHelper.connect(DATABASE_CONNECTION_URL, DATABASE_NAME)
    db = await databaseHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection(USERS_COLLECTION).deleteMany()
  })

  afterAll(async () => {
    await databaseHelper.disconnect()
  })

  test('should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.exec('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should return user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    const user = await sut.exec('valid_email@mail.com')

    expect(user._id).toEqual(fakeUser.insertedId)
  })
})
