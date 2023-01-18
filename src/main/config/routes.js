const router = require('express').Router()
// const fb = require('fast-glob')
const { loginRoutes } = require('../routes')

function setupRoutes (app) {
  app.use('/api', router)

  loginRoutes(router)

  // fb.sync('**/src/main/routes/**.js')
  //   .forEach(file => require(`../../../${file}`)(router))
}

module.exports = {
  setupRoutes
}
