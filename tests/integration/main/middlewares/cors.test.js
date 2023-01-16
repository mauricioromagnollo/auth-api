const request = require('supertest')

const { app } = require('../../../../src/main/config')

describe('cors', () => {
  test('should enable CORS', async () => {
    app.get('/route', (req, res) => {
      res.send('')
    })

    const res = await request(app)
      .get('/route')

    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
