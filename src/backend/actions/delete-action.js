module.exports = {
  name: 'delete',
  isVisible: true,
  actionType: 'record',
  icon: 'icomoon-remove-2',
  label: 'Remove',
  guard: {
    title: 'Confirm',
    content: 'Do you really want to remove this item?',
    button: 'Remove',
  },
  handler: async (request, response, data) => {
    await data.resource.delete(data.record.id())
    return response.redirect(data.h.listUrl(data.resource))
  },
}
