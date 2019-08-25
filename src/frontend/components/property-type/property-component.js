import defaultType from './default-type'
import boolean from './boolean'
import datetime from './datetime'
import richtext from './richtext'
import reference from './reference'

const types = {
  boolean,
  datetime,
  reference,
  date: datetime,
  richtext,
}

/**
 * Returns component which should be used to render given property
 *
 * @param {BaseProperty~JSON} property
 * @param {String}            where        one of _list_, _show_, _edit_, _filter_
 * @param {Boolean}           isClient=true   set to true when computation is made on the
 *                                            client side (react hydrate)
 * @return {BasePropertyComponent} component which takes props from the BasePropertyComponent
 * @private
 */
const propertyComponent = (property, where, isClient = true) => {
  let component = (types[property.type] && types[property.type][where])
                          || defaultType[where]

  if (property.components && property.components[where] && isClient) {
    component = AdminBro.UserComponents[property.components[where]]
  }

  return component
}

export default propertyComponent
