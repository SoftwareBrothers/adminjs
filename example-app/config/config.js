module.exports = {
  development: {
    operatorsAliases: false,
    username: process.env.POSTGRES_USER | 'postgres',
    password: process.env.POSTGRES_PASSWORD | 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE || 'adminbro_e2e_development',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'adminbro_e2e_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },
}
