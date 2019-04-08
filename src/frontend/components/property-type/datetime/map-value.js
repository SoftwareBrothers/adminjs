export default (value, type) => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return date.toLocaleString()
}
  