const { DatabaseHelper } = require('../../../../src/infra/helpers/database')
const { MissingParamError } = require('../../../../src/utils/errors')
const { UpdateAccessTokenRepository } = require('../../../../src/infra/repositories')

let databaseHelper = null
let db = null

const USERS_COLLECTION = 'users'
const DATABASE_NAME = 'auth_api_test'
const DATABASE_CONNECTION_URL = `mongodb://root:root@localhost:27017/${DATABASE_NAME}?authSource=admin`

const makeSut = () => {
  const userModel = db.collection(USERS_COLLECTION)
  const sut = new UpdateAccessTokenRepository(userModel)

  return {
    sut,
    userModel
  }
}

describe('UpdateAccessTokenRepository', () => {
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

  test('should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    await sut.exec(fakeUser.insertedId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('should throw if no userModel is provided', () => {
    const sut = new UpdateAccessTokenRepository()

    const promise = sut.exec('valid_id', 'valid_token')

    expect(promise).rejects.toThrow()
  })

  test('should throw if no params are provided', () => {
    const { sut } = makeSut()

    expect(sut.exec()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.exec('valid_id')).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
