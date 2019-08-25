import flat from 'flat'

const { unflatten } = flat

const convertParamsToArrayItems = (property, record) => {
  const regex = new RegExp(`^${property.name}`)
  const keys = Object.keys(record.params).filter(key => key.match(regex))
  const obj = keys.reduce((memo, key) => ({ ...memo, [key]: record.params[key] }), {})
  return unflatten(obj)[property.name] || []
}

export default convertParamsToArrayItems
