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

  test('should return xml content type if this content type to be defined', async () => {
    app.get('/route2', (req, res) => {
      res.type('xml')
      res.send({})
    })

    await request(app)
      .get('/route2')
      .expect('content-type', /xml/)
  })
})
