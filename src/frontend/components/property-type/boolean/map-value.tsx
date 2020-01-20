export default (value): 'Yes' | 'No' | '' => {
  if (typeof value === 'undefined') {
    return ''
  }
  return value ? 'Yes' : 'No'
}
