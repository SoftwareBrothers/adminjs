module.exports = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'icomoon-add',
  label: 'Add new',
  handler: async (request, response, data) => {
    if (request.method === 'post') {
      let record = await data.resource.build(request.payload.record)
      record = await record.save()
      if (record.isValid()) {
        return {
          redirectUrl: data.h.recordActionUrl(
            data.resource.id(), record.id(), 'show',
          ),
          record: record.toJSON(),
        }
      }
      return { record: record.toJSON() }
    }
    return {}
  },
}
