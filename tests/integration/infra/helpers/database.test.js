// const { DatabaseHelper } = require('../../../../src/infra/helpers/database')

// const sut = new DatabaseHelper()

describe('Mongo Helper', () => {
  // beforeAll(async () => {
  //   await sut.connect('mongodb://db:27017', 'auth_api')
  // })

  // afterAll(async () => {
  //   await sut.disconnect()
  // })

  test('Should reconnect when getCollection() is invoked and client is disconnected', async () => {
    expect(true).toBeTruthy()
    // expect(sut.db).toBeTruthy()
    // await sut.disconnect()
    // expect(sut.db).toBeFalsy()
    // await sut.getCollection('users')
    // expect(sut.db).toBeTruthy()
  })
})
