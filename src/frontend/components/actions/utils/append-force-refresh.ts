export const REFRESH_KEY = 'refresh'
export const IGNORE_PARAMS_KEY = 'ignore_params'

/**
 * Adds refresh=true to the url, which in turn should cause list to reload.
 *
 * @param {string} url      url to which function should add `refresh`
 * @param {string} [search] optional search query which should be updated,
 *                          if not given function will use window.location.search
 * @private
 */
export const appendForceRefresh = (url: string, search?: string): string => {
  const searchParamsIdx = url.lastIndexOf('?')
  const urlSearchParams = searchParamsIdx !== -1
    ? url.substring(searchParamsIdx + 1)
    : null

  const oldParams = new URLSearchParams(search ?? urlSearchParams ?? window.location.search ?? '')
  const shouldIgnoreOldParams = new URLSearchParams(urlSearchParams || '').get(IGNORE_PARAMS_KEY) === 'true'
  const newParams = shouldIgnoreOldParams ? new URLSearchParams('') : new URLSearchParams(oldParams.toString())

  newParams.set(REFRESH_KEY, 'true')

  const newUrl = searchParamsIdx !== -1
    ? url.substring(0, searchParamsIdx)
    : url

  return `${newUrl}?${newParams.toString()}`
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
