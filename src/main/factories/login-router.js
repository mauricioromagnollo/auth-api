const { LoginRouter } = require('../../presentation/routers')
const { AuthUseCase } = require('../../domain/usecases')
const { LoadUserByEmailRepository, UpdateAccessTokenRepository } = require('../../infra/repositories')
const { Encrypter, TokenGenerator, EmailValidator } = require('../../utils/helpers')
// const { Env } = require('../config')
const { DatabaseHelper } = require('../../infra/helpers')

async function makeUserModel () {
  const database = new DatabaseHelper()
  await database.connect('mongodb://root:root@db/auth_api?authSource=admin', 'auth_api')
  const db = await database.getDb()
  const userModel = await db.collection('users')
  return userModel
}

async function makeLoginRouter () {
  const userModel = makeUserModel()
  const emailValidator = new EmailValidator()
  const loadUserByEmailRepository = new LoadUserByEmailRepository(userModel)
  const updateAccessTokenRepository = new UpdateAccessTokenRepository(userModel)
  const encrypter = new Encrypter()
  const tokenGenerator = new TokenGenerator('Env.TOKEN_SECRET')
  const authUseCase = new AuthUseCase({
    loadUserByEmailRepository,
    updateAccessTokenRepository,
    encrypter,
    tokenGenerator
  })

  return new LoginRouter({ authUseCase, emailValidator })
}

module.exports = {
  makeLoginRouter
}
