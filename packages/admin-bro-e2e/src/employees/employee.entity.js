const mongoose = require('mongoose')

const Skill = new mongoose.Schema({
  name: String,
  level: {
    type: String,
    enum: ['junior', 'middle', 'senior'],
  },
  Profession: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profession',
  },
})

const OtherSchema = new mongoose.Schema({
  name: String,
  arrayed: {
    type: [Skill],
  },
})

const Skills = new mongoose.Schema({
  softShills: [{
    type: Skill,
  }],
  hardSkills: [{
    type: Skill,
  }],
})

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
  interests: {
    type: [String],
  },
  professions: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profession',
  }],

  Skills: {
    type: Skills,
  },

  otherField: {
    type: [OtherSchema],
  },
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = { EmployeeSchema, Employee }
