const mongoose = require('mongoose')

const { Schema } = mongoose

const AdminSchema = new Schema({
  email: String,
  password: String,
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
