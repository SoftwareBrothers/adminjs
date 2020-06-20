const { Taggable } = require('../../models/index')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  actions: {
    show: {
      isAccessible: false,
    },
  },
}

module.exports = {
  options,
  resource: Taggable,
}
