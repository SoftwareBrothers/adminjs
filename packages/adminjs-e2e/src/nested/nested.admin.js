const { default: AdminJS } = require('adminjs')
const { Nested } = require('./nested.entity')

/** @type {import('adminjs').ResourceOptions} */
const options = {
  properties: {
    valueTrigger: {
      components: {
        edit: AdminJS.bundle('./value-trigger.component.tsx'),
      },
    },
  },
}

module.exports = {
  options,
  resource: Nested,
}
