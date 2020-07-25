import { PropertyType } from '../../../../backend/adapters/base-property'

/**
 * adds leading 0 to the number when it is lower than 10
 * @private
 */
const pad = (n: number): string => (n < 10 ? `0${n.toString()}` : n.toString())

/**
 * Formats date to YYYY-MM-DD
 *
 * @param   {Date}    date
 * @return  {string}
 * @private
 */
const formatDate = (date: Date): string => `${date.getFullYear()}-${pad(date.getMonth() + 1)
}-${pad(date.getDate())}`

/**
 * Formats date to HH:mm
 *
 * @param   {Date}    date
 * @return  {string}
 * @private
 */
const formatTime = (date: Date): string => `${pad(date.getHours())}:${pad(date.getMinutes())}`

/**
 * Formats date to YYYY-MM-DD HH:mm
 *
 * @param   {Date}    date
 * @return  {string}
 * @private
 */
const formatDateTime = (date: Date): string => `${formatDate(date)} ${formatTime(date)}`

/**
 * Based on the property type formats date to either YYYY-MM-DD HH:mm or YYYY-MM-DD
 *
 * @param   {Date}    date
 * @return  {string}
 * @private
 */
const formatDateProperty = (date: Date, propertyType?: PropertyType): string => {
  if (propertyType === 'date') {
    return formatDate(date)
  }
  return formatDateTime(date)
}

export {
  formatDateProperty,
  formatDate,
  formatDateTime,
  pad,
}
