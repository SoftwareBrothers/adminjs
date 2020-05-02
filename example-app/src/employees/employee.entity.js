const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  company: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Company',
  },
  professions: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profession',
  }],
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = { EmployeeSchema, Employee }
