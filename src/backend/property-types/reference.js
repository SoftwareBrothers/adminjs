const Renderer = require('../utils/renderer')
const Filter = require('../utils/filter')

const renderer = new Renderer()

const findReference = (property, record) => {
  const referenceRecord = record.populated[property.name()]
  const referenceResource = property.reference()
  const value = referenceRecord
    ? referenceResource.decorate().titleOf(referenceRecord) : record.param(property.name())
  return { value, referenceRecord }
}

/**
 * @type {PropertyType}
 * @module defaultType
 * @category PropertyTypes
 */
module.exports = {
  list: (property, record, h) => {
    const { value, referenceRecord } = findReference(property, record)
    return renderer.render('property-types/reference/list', {
      h, value, record: referenceRecord, property,
    })
  },
  show: (property, record, h) => {
    const { value, referenceRecord } = findReference(property, record)
    return renderer.render('property-types/reference/show', {
      value, property, h, record: referenceRecord,
    })
  },

  edit: (property, record, h) => {
    const value = record.param && record.param(property.name())
    const error = record.error && record.error(property.name())
    const referenceRecord = record.populated[property.name()]
    return renderer.render('property-types/reference/edit', {
      value, property, h, error, record: referenceRecord, resource: property.reference(),
    })
  },

  // In the first release filtering by reference is turned off
  filter: (property, filterProperty, h) => {
    const filterKey = Filter.toFilterKey(property)
    const value = (filterProperty && filterProperty.value) || {}
    const resource = property.reference()
    const record = filterProperty.populated
    return renderer.render('property-types/reference/filter', {
      property, filterKey, h, value, resource, record,
    })
  },

  head: {
    scripts: [],
    styles: [],
  },
}
