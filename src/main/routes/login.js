const { ExpressRouterAdapter } = require('../adapters')
const { makeLoginRouter } = require('../factories')

async function loginRoutes (router) {
  const loginRouter = await makeLoginRouter()
  router.post('/login', ExpressRouterAdapter.adapt(loginRouter))
}

module.exports = {
  loginRoutes
}
