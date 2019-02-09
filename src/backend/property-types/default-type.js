const Renderer = require('../utils/renderer')

const renderer = new Renderer()

/**
 * @type {PropertyType}
 * @module defaultType
 * @category PropertyTypes
 */
module.exports = {
  head: null,

  list: (property, record, h) => {
    const value = record.param(property.name())
    return renderer.render('property-types/default/list', {
      h, value, record, property,
    })
  },
  show: (property, record, h) => {
    const value = record.param(property.name())
    return renderer.render('property-types/default/show', {
      value, property, h,
    })
  },

  edit: (property, record, h) => {
    const value = record.param(property.name())
    const error = record.error(property.name())
    return renderer.render('property-types/default/edit', {
      value, property, h, error,
    })
  },

  filter: (property, filters, h) => {
    const filterKey = `filters.${property.name()}`
    return renderer.render('property-types/default/filter', {
      property, filterKey, h, filters,
    })
  },
}
