const convertParam = (value: any, propertyType: string): any => {
  if (propertyType === 'number') {
    return Number(value)
  }

  if (propertyType === 'boolean') {
    return Boolean(value)
  }

  if (['datetime', 'date'].includes(propertyType) && value !== null) {
    return new Date(value)
  }

  return value
}

export { convertParam }
