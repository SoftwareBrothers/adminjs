module.exports = {
  name: 'delete',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-remove-2',
  label: 'Remove',
  guard: 'Do you really want to remove this item?',
  component: false,
  handler: async (request, response, data) => {
    await data.resource.delete(request.params.recordId)
    return {
      redirectUrl: data.h.listUrl({ resourceId: data.resource.id() })
    }
  },
}
