const mongoose = require('mongoose')

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
})

const Page = mongoose.model('Page', PageSchema)

module.exports = { PageSchema, Page }
