const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const SALT_WORK_FACTOR = 10

const AdminSchema = new Schema({
  email: String,
  password: String,
})

AdminSchema.pre('save', function(next) {
  const admin = this;
  bcrypt.hash(admin.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    admin.password = hash;
    next();
  });
});

AdminSchema.pre('findOneAndUpdate', function(next) {
  const update = this._update.$set
  bcrypt.hash(update.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    update.password = hash;
    next();
  });
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
