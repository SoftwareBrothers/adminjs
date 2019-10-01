export default (queryString: string): boolean => {
  const query = new URLSearchParams(queryString)
  for (const key of query.keys()) {
    if (key.match('filters.')) {
      return true
    }
  }
  return false
}
