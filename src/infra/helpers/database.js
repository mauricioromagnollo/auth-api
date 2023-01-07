const { MongoClient } = require('mongodb')

class DatabaseHelper {
  async connect (url, dbName) {
    this.url = url
    this.dbName = dbName

    this.client = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await this.client.connect()
    this.db = this.client.db(this.dbName)
  }

  async disconnect () {
    await this.client.close()
  }

  async getDb () {
    if (!this.client.isConnected()) {
      await this.connect(this.url, this.dbName)
    }
  }
}

module.exports = {
  DatabaseHelper
}
