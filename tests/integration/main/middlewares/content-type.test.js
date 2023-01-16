const request = require('supertest')

const { app } = require('../../../../src/main/config')

describe('contentType Middleware', () => {
  test('should return json content type as default', async () => {
    app.get('/route', (req, res) => {
      res.send({})
    })

    await request(app)
      .get('/route')
      .expect('content-type', /json/)
  })
})
