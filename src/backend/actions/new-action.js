const Renderer = require('../utils/renderer')

const renderer = new Renderer()

module.exports = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'icomoon-add',
  label: 'Add new',
  handler: async (request, response, data) => {
    if (request.method === 'get') {
      const record = data.resource.build()
      return renderer.render('actions/new', { ...data, record })
    }

    if (request.method === 'post') {
      let record = await data.resource.build(request.payload)
      record = await record.save()
      if (record.isValid()) {
        const showAction = data.resource.decorate().actions.show
        return response.redirect(data.h.recordActionUrl(
          data.resource, showAction, record,
        ))
      }
      return renderer.render('actions/new', { ...data, record })
    }
  },
}
