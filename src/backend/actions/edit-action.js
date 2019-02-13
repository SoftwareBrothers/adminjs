const Renderer = require('../utils/renderer')

const renderer = new Renderer()

module.exports = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-edit',
  label: 'Edit',
  handler: async (request, response, data) => {
    if (request.method === 'get') {
      return renderer.render('actions/edit', data)
    }
    if (request.method === 'post') {
      await data.record.update(request.payload)
      if (data.record.isValid()) {
        const showAction = data.resource.decorate().actions.show
        return response.redirect(data.h.recordActionUrl(
          data.resource, showAction, data.record,
        ))
      }
      return renderer.render('actions/edit', data)
    }
    return ''
  },
}
