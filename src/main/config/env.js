const Env = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: Number(process.env.PORT) || 3000,
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'any_secret',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
  DATABASE_NAME: process.env.DATABASE_NAME || 'auth_api',
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 27017,
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_CONNECTION_URL: process.env.DATABASE_CONNECTION_URL ||
    `mongodb://${this.DATABASE_USERNAME}:${this.DATABASE_PASSWORD}$@${this.DATABASE_HOST}:${this.DATABASE_PORT}/${this.DATABASE_NAME}?authSource=admin`
}

module.exports = {
  Env
}
