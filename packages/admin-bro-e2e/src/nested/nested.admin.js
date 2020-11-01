const { default: AdminBro } = require('admin-bro')
const { Nested } = require('./nested.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  properties: {
    valueTrigger: {
      components: {
        edit: AdminBro.bundle('./value-trigger.component.tsx'),
      },
    },
  },
}

module.exports = {
  options,
  resource: Nested,
}
