const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  profilePhotoLocation: {
    type: String,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  disabledAt: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
  },
  isBig: {
    type: Boolean,
  }
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = { CompanySchema, Company }
