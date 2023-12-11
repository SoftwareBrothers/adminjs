const convertParam = (value: any, propertyType: string): any => {
  if (value === null || typeof value === 'undefined') {
    return value
  }

  if (propertyType === 'number') {
    return Number(value)
  }

  if (propertyType === 'boolean') {
    return Boolean(value)
  }

  if (['datetime', 'date'].includes(propertyType)) {
    return new Date(value)
  }

  return value
}

export { convertParam }
