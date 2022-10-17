const { default: AdminJS } = require('adminjs')
const ComponentLoader = require('adminjs/utils/component-loader')
const { Nested } = require('./nested.entity')

const loader = new ComponentLoader()
const Components = {
  ValueTrigger: loader.add('ValueTrigger', './value-trigger.component.tsx'),
}
loader.bundleAll()

/** @type {import('adminjs').ResourceOptions} */
const options = {
  properties: {
    valueTrigger: {
      components: {
        edit: Components.ValueTrigger,
      },
    },
  },
}

module.exports = {
  options,
  resource: Nested,
}
