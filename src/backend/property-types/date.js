const Renderer = require('../utils/renderer')

const renderer = new Renderer()

/**
 * @type {PropertyType}
 * @module date
 * @category PropertyTypes
 */
module.exports = {
  head: {
    styles: ['https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.5.6/themes/default.css',
      'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.5.6/themes/default.date.css'],
    scripts: ['https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.5.6/picker.js',
      'https://cdnjs.cloudflare.com/ajax/libs/pickadate.js/3.5.6/picker.date.js'],
  },

  list: (property, record, h) => {
    let value = record.param(property.name())
    value = h.moment(value).format('YYYY-MM-DD')
    return renderer.render('property-types/default/list', {
      h, value, record, property,
    })
  },
  show: (property, record, h) => {
    let value = record.param(property.name())
    value = h.moment(value).format('YYYY-MM-DD')
    return renderer.render('property-types/default/show', {
      value, property, h,
    })
  },

  edit: (property, record, h) => {
    let value = record.param(property.name())
    value = h.moment(value).format('YYYY-MM-DD')
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
