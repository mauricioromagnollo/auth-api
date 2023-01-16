const request = require('supertest')

const { app } = require('../../../../src/main/config')

describe('setupApp', () => {
  test('should disable x-powered-by header', async () => {
    app.get('/test-route', (req, res) => {
      res.send('')
    })

    const res = await request(app)
      .get('/test-route')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
