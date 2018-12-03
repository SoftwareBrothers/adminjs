const mongoose = require('mongoose')

const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: String,
  content: String,
  author: String,
  createdAt: Date,
  published: Boolean,
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
