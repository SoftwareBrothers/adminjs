const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const { Schema } = mongoose

const AdminSchema = new Schema({
  email: String,
  password: String,
})

AdminSchema.pre('save', function(next) {
  console.log('saave')
  const admin = this;

  // only hash the password if it has been modified (or is new)
  if (!admin.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(admin.password, salt, (err, hash) => {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          admin.password = hash;
          next();
      });
  });
});

AdminSchema.pre('update', function(next) {
  console.log('duupa', this.password)
  const admin = this;

  // only hash the password if it has been modified (or is new)

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(admin.password, salt, (err, hash) => {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          admin.password = hash;
          next();
      });
  });
});


const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
