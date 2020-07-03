const { Profession } = require('./profession.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  properties: {
    randomContent: {
      isRequired: true,
    },
    'affects.speed.easy': {
      isVisible: false,
    },
  },
}

module.exports = {
  options,
  resource: Profession,
}
