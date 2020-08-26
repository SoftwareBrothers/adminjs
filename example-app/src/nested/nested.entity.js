const mongoose = require('mongoose')

const InnerElement = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const TopArrayElement = new mongoose.Schema({
  innerObjects: {
    type: [InnerElement],
    required: true,
  },
})

const NestedSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  topObjects: [TopArrayElement],
})

const Nested = mongoose.model('Nested', NestedSchema)

module.exports = { ToolSchema: NestedSchema, Nested }
