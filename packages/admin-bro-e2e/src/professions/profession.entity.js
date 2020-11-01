const mongoose = require('mongoose')

const AffectsTypeSchema = new mongoose.Schema({
  easy: String,
  medium: String,
  height: String,
})

const AffectsSchema = new mongoose.Schema({
  speed: AffectsTypeSchema,
})

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
  affects: {
    type: AffectsSchema,
  },
})

const Profession = mongoose.model('Profession', ProfessionSchema)

module.exports = { ProfessionSchema, Profession }
