const { cors } = require('../middlewares/cors')

function setupApp (app) {
  app.disable('x-powered-by')
  app.use(cors)
}

module.exports = {
  setupApp
}