import { filterOutParams } from './filter-out-params.js'
import { FlattenParams } from './flat.types.js'
import { get } from './get.js'
import { set } from './set.js'
import { pathToParts } from './path-to-parts.js'
import { DELIMITER } from './constants.js'

/**
 * @load ./remove-path.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {...string} properties
 * @returns {FlattenParams}
 */
const removePath = (params: FlattenParams, path: string): FlattenParams => {
  // by default simply filter out elements from the object
  let filtered = filterOutParams(params, path)

  // reverse means that we iterate from the closes parent
  const parentPaths = pathToParts(path).reverse()

  // but if one of the parent is an array
  parentPaths.find((parentPath, parentIndex) => {
    const parent = get(params, parentPath)
    if (Array.isArray(parent)) {
      // previous element is stringified index like 'property.1'
      const previousPaths = parentPaths[parentIndex - 1].split(DELIMITER)
      // so this is the index: 1
      const previousPathIndex = previousPaths[previousPaths.length - 1]
      parent.splice(+previousPathIndex, 1)
      filtered = set(params, parentPath, parent)
      // this works just for the firstly found array item, because in case of removing the last one
      // it leaves `[]` as a value.
      return true
    }
    return false
  })

  return filtered
}

export { removePath }
