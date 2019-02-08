const Renderer = require('../utils/renderer')

const renderer = new Renderer()

/**
 * @type {PropertyType}
 * @name PropertyType~defaultType
 */
module.exports = {
  head: null,

  list: (property, record, h) => {
    let value = record.param(property.name())
    value = h.moment(value).format('YYYY-MM-DD HH:DD')
    return renderer.render('property-types/default/list', {
      h, value, record, property,
    })
  },
  show: (property, record, h) => {
    let value = record.param(property.name())
    value = h.moment(value).format('YYYY-MM-DD HH:DD')
    return renderer.render('property-types/default/show', {
      value, property, h,
    })
  },

  edit: (property, record, h) => {
    let value = record.param(property.name())
    value = h.moment(value).format('YYYY-MM-DD HH:DD')
    const error = record.error(property.name())
    return renderer.render('property-types/date/edit', {
      value, property, h, error,
    })
  },

  filter: (property, filters, h) => {
    const filterKey = `filters.${property.name()}`
    return renderer.render('property-types/date/filter', {
      property, filterKey, h, filters,
    })
  },
}
