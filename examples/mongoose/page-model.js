const mongoose = require('mongoose')

const { Schema } = mongoose

const PageSchema = new Schema({
  content: String,
  title: String,
  createdAt: Date,
  createdBy: String,
  tags: String,
  seo: {
    title: String,
    keywords: String,
  },
  sections: String,
})

const Page = mongoose.model('Page', PageSchema)

module.exports = Page
