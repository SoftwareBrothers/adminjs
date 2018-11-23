const TITLE_COLUMN_NAMES = ['title', 'name', 'subject']

class AbstractProperty {

  /**
   * Name of the property
   * @return {[type]} [description]
   */
  name() {

  }

  /**
   * Return type of a property
   * @return {String} One of available property types:
   *                      [id, string, object, float, number, boolean,
   *                       text, date]
   */
  type() {
    
  }

  /**
   * When properties are nested - parent property should have its children
   * @return {AbstractProperty[]} [description]
   */
  childProperties() {
    return null
  }
}

module.exports = AbstractProperty
