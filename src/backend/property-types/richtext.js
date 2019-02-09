const xss = require('xss')
const Renderer = require('../utils/renderer')
const defaultType = require('./default-type')

const renderer = new Renderer()

/**
 * @type {PropertyType}
 * @module richtext
 * @category PropertyTypes
 */
module.exports = {
  list: (property, record, h) => {
    const original = record.param(property.name()) || ''
    const value = original.substring(0, 15) + (original.length > 15 ? '...' : '')
    return renderer.render('property-types/default/list', {
      h, value, record, property,
    })
  },
  show: (property, record, h) => {
    const value = xss(record.param(property.name()))
    return renderer.render('property-types/richtext/show', {
      value, property, h,
    })
  },

  edit: (property, record, h) => {
    const value = xss(record.param(property.name()))
    const error = record.error(property.name())
    return renderer.render('property-types/richtext/edit', {
      value, property, h, error,
    })
  },

  filter: defaultType.filter,

  head: {
    scripts: ['https://cdn.quilljs.com/1.3.6/quill.js'],
    styles: ['https://cdn.quilljs.com/1.3.6/quill.snow.css'],
  },
}
