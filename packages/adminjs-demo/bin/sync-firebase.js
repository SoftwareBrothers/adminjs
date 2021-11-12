const { dotenv } = require('../build/src/utils/dot-env-json')

dotenv({ path: 'firebase.env.json' })

const { connect, models } = require('../build/src/databases/sequelize')

connect().then((sequelize) => {
  process.exit(0)
})
