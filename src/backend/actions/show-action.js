const Renderer = require('../utils/renderer')

const renderer = new Renderer()

module.exports = {
  name: 'show',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-info',
  label: 'Info',
  handler: async (request, response, data) => renderer.render('actions/show', data),
}
