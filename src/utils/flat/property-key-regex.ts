import { DELIMITER } from './constants'
import { GetOptions } from './flat.types'
// this is the regex used to find all existing properties starting with a key

export const propertyKeyRegex = (propertyPath: string, options?: GetOptions): RegExp => {
  const delimiter = new RegExp(`\\${DELIMITER}`, 'g')
  const escapedDelimiter = `\\${DELIMITER}`
  // but for `nested.1.property.0` it will produce `nested(\.|\.\d+\.)1(\.|\.\d+\.)property.0`
  // and this is intentional because user can give an one index in property path for with deeply
  // nested arrays
  const escapedDelimiterOrIndex = `(${escapedDelimiter}|${escapedDelimiter}\\d+${escapedDelimiter})`
  const path = options?.includeAllSiblings
    ? propertyPath.replace(delimiter, escapedDelimiterOrIndex)
    : propertyPath.replace(delimiter, escapedDelimiter)
  return new RegExp(`^${path}($|${escapedDelimiter})`, '')
}
