/**
 * @module models
 */

const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  auth: {
    password: String,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
