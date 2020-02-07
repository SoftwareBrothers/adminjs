export const REFRESH_KEY = 'refresh'

/**
 * Adds refresh=true to the url, which in turn should cause list to reload.
 *
 * @param {string} url      url to which function should add `refresh`
 * @param {string} [search] optional search query which should be updated,
 *                          if not given function will use window.location.search
 * @private
 */
export const appendForceRefresh = (url: string, search?: string): string => {
  const params = new URLSearchParams(search ?? window.location.search)
  params.set(REFRESH_KEY, 'true')
  return `${url}?${params}`
}

export const hasForceRefresh = (search: string): boolean => {
  const params = new URLSearchParams(search)
  return !!params.get(REFRESH_KEY)
}

export const removeForceRefresh = (search: string): string => {
  const params = new URLSearchParams(search)
  if (params.get(REFRESH_KEY)) {
    params.delete(REFRESH_KEY)
  }
  return params.toString()
}
