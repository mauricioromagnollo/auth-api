// const { DatabaseHelper } = require('../infra/helpers')
// const { app, Env } = require('./config')
const { app } = require('./config')

async function main () {
  try {
    // const database = new DatabaseHelper()
    // await database.connect(Env.DATABASE_CONNECTION_URL)
    // app.listen(Env.PORT, () => console.log('server running'))
    app.listen(3333, () => console.log('server running'))
  } catch (error) {
    console.error(error)
  }
}

main()
