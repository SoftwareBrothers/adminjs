const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const SALT_WORK_FACTOR = 10

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

UserSchema.pre('save', function(next) {
  const userAuth = this.auth
  bcrypt.hash(userAuth.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err)
    userAuth.password = hash
    next()
  })
})

UserSchema.pre('findOneAndUpdate', function(next) {
  const passwordKey = 'auth.password'
  const update = this._update.$set
  bcrypt.hash(update[passwordKey], SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err)
    update[passwordKey] = hash
    next()
  })
})

const User = mongoose.model('User', UserSchema)

module.exports = User
