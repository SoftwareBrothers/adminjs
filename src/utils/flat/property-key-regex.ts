import { DELIMITER } from './constants'
// this is the regex used to find all existing properties starting with a key

export const propertyKeyRegex = (property: string): RegExp => {
  const escapedDelimiter = `\\${DELIMITER}`
  return new RegExp(`^${property.replace(DELIMITER, escapedDelimiter)}($|${escapedDelimiter})`)
}
