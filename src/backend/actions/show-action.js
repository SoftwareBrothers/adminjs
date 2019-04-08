const populator = require('../utils/populator')

module.exports = {
  name: 'show',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-info',
  label: 'Info',
  handler: async (request, response, data) => {
    const record = await data.resource.findOne(request.params.recordId)
    const [populated] = await populator([record])
    return { record: populated.toJSON() }
  },
}
