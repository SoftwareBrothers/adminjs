const populator = require('../utils/populator')

module.exports = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-edit',
  label: 'Edit',
  handler: async (request, response, data) => {
    const record = await data.resource.findOne(request.params.recordId)
    if (request.method === 'get') {
      const [populated] = await populator([record])
      return { record: populated.toJSON() }
    }
    if (request.method === 'post') {
      await record.update(request.payload.record)
      if (record.isValid()) {
        return {
          redirectUrl: data.h.recordActionUrl({
            resourceId: data.resource.id(), recordId: record.id(), actionName: 'show',
          }),
          record: record.toJSON(),
        }
      }
      return { record: record.toJSON() }
    }
    return ''
  },
}
