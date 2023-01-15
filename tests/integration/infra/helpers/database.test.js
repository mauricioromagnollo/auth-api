const { DatabaseHelper } = require('../../../../src/infra/helpers/database')

const DATABASE_NAME = 'auth_api_test'
const DATABASE_CONNECTION_URL = `mongodb://root:root@localhost:27017/${DATABASE_NAME}?authSource=admin`

describe('DatabaseHelper', () => {
  const sut = new DatabaseHelper()

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should connect to database', async () => {
    await sut.connect(DATABASE_CONNECTION_URL, DATABASE_NAME)
    expect(await sut.isConnected()).toBeTruthy()
    const db = await sut.getDb()
    expect(db).toBeTruthy()
    await sut.disconnect()
    expect(await sut.isConnected()).toBeFalsy()
  })

  test('should connect to database when is not connected and getDb is required', async () => {
    await sut.connect(DATABASE_CONNECTION_URL, DATABASE_NAME)
    await sut.disconnect()
    const db = await sut.getDb()
    expect(db).toBeTruthy()
    await sut.disconnect()
  })
})
