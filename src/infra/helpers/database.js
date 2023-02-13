const { MongoClient } = require('mongodb')

class DatabaseHelper {
  constructor () {
    this._db = null
    this._client = null
    this._url = null
    this._dbName = null
  }

  async connect (url, dbName) {
    this._url = url
    this._dbName = dbName

    this._client = new MongoClient(this._url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await this._client.connect()
    this._db = this._client.db(this._dbName)
  }

  async disconnect () {
    await this._client.close()
  }

  async isConnected () {
    try {
      await this._db.command({ ping: 1 })
      return true
    } catch (err) {
      return false
    }
  }

  async getDb () {
    if (!await this.isConnected()) {
      await this.connect(this._url, this._dbName)
    }

    return this._db
  }
}

module.exports = {
  DatabaseHelper
}
