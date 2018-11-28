const mongoose = require('mongoose')

const { Schema } = mongoose

const CategorySchema = new Schema({
  title: String,
  createdAt: Date,
  parentCategoryId: String,
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
