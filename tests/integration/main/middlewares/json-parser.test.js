const request = require('supertest')

const { app } = require('../../../../src/main/config')

describe('jsonParserMiddleware', () => {
  test('should parse body as JSON', async () => {
    app.post('/route', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/route')
      .send({ foo: 'bar' })
      .expect({ foo: 'bar' })
  })
})
