const { cors, jsonParser, contentType } = require('../middlewares')

function setupApp (app) {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser())
  app.use(contentType)
}

module.exports = {
  setupApp
}
