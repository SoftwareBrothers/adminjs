const mongoose = require('mongoose')

const ToolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

const Tool = mongoose.model('Tool', ToolSchema)

module.exports = { ToolSchema, Tool }
