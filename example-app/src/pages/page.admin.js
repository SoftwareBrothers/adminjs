const { Page } = require('./page.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  properties: {
    content: {
      type: 'richtext',
      custom: {
        modules: {
          toolbar: [['bold', 'italic'], ['link', 'image']],
        },
      },
    },
  },
}

module.exports = {
  options,
  resource: Page,
}
