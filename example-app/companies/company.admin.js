const AdminBro = require('admin-bro')
const { Company } = require('./company.entity')

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
    profilePhotoLocation: {
      isVisible: false,
    },
    password: {
      type: 'password',
    },
  },
  actions: {
    show: {
      isVisible: false,
    },
  },
}

module.exports = {
  options,
  resource: Company,
}
