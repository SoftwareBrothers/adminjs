const mongoose = require('mongoose')

const ProfessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  randomContent: {
    type: String,
  },
  otherNotRequired: {
    type: String,
  },
})

const Profession = mongoose.model('Profession', ProfessionSchema)

module.exports = { ProfessionSchema, Profession }
