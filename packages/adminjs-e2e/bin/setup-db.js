require('dotenv-json')({ path: 'cypress.env.json' })
const mongoose = require('mongoose')

const { Company } = require('../src/companies/company.entity')
const { Profession } = require('../src/professions/profession.entity')
const { Employee } = require('../src/employees/employee.entity')
const { Tool } = require('../src/tools/tool.entity')

const { MONGO_URL } = process.env

const setupDb = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  await Company.deleteMany({})
  await Tool.deleteMany({})
  await Profession.deleteMany({})
  await Employee.deleteMany({})

  await Profession.create([{
    name: 'react',
    description: 'React developer',
  }, {
    name: 'vue',
    description: 'Vue developer',
  }, {
    name: 'node',
    description: 'Node.js developer',
  }, {
    name: 'lover',
    description: ':)',
  }])

  await Tool.create([...new Array(100)].map((el, index) => ({
    name: `tool ${index}`,
    description: null,
  })))
}

setupDb().then(() => {
  // eslint-disable-next-line no-console
  console.log('successfully prepared the database to test')
  mongoose.disconnect()
})
