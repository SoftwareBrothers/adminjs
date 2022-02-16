export const FILTER_USER_INITIALIZE = 'FILTER_USER_INITIALIZE'

export type InitializeFilterUserResponse = {
  type: typeof FILTER_USER_INITIALIZE;
  data: string;
}

export const initializeFilterUser = (
  data: string,
): InitializeFilterUserResponse => ({
  type: FILTER_USER_INITIALIZE,
  data,
})
