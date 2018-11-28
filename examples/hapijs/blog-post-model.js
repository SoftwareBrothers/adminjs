const mongoose = require('mongoose')

const { Schema } = mongoose

const BlogPostSchema = new Schema({
  content: String,
  title: String,
  createdAt: Date,
  createdBy: String,
  tags: String,
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
