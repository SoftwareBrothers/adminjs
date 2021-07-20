import { Sequelize } from 'sequelize'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  SYNC,
  POSTGRES_HOST,
} = process.env
const sequelizeUrl = [
  'postgres://', POSTGRES_USER, ':', POSTGRES_PASSWORD, '@', POSTGRES_HOST, ':', POSTGRES_PORT,
  '/', POSTGRES_DATABASE,
].join('')

export const sequelize = new Sequelize(sequelizeUrl, {
  logging: false,
})

export const connect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  if (SYNC === 'true') {
    await sequelize.sync({ force: true })
    console.log('Database has been synced.')
  }

  return sequelize
}

process.on('exit', () => {
  sequelize.close()
})
