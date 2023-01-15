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

  async isConnected () {
    try {
      await this.db.command({ ping: 1 })
      return true
    } catch (err) {
      return false
    }
  }

  async getDb () {
    if (!await this.isConnected()) {
      await this.connect(this.url, this.dbName)
    }

    return this.db
  }
}

module.exports = {
  DatabaseHelper
}
