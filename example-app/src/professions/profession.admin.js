const { Profession } = require('./profession.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  properties: {
    randomContent: {
      isRequired: true,
    },
  },
}

module.exports = {
  options,
  resource: Profession,
}
