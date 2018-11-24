const NotImplementedError = require('../../utils/not-implemented-error')
const TITLE_COLUMN_NAMES = ['title', 'name', 'subject']

class AbstractProperty {

  /**
   * Name of the property
   * @return {[type]} [description]
   */
  name() {
    throw new NotImplementedError()
  }

  /**
   * Return type of a property
   * @return {String} One of available property types:
   *                      [id, string, float, number, boolean, date]
   */
  type() {
    throw new NotImplementedError()
  }

  /**
   * Indicates if given property should be visible
   * @return {Boolean}
   */
  isVisible() {
    return true
  }

  /**
   * Indicates if value of given property can be updated
   * @return {Boolean}
   */
  isEditable() {
    return true
  }
}

module.exports = AbstractProperty
