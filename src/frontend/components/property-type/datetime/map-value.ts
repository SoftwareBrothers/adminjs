export default (value: Date): string => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return date.toLocaleString()
}
