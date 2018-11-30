const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  auth: {
    password: {
      type: String,
      required: true,
    },
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
