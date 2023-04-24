/* eslint-disable max-len */
export const getDataCss = (...args: (string | number)[]) => args.join('-')

export const getResourceElementCss = (resourceId: string, suffix: string) => getDataCss(resourceId, suffix)

export const getActionElementCss = (resourceId: string, actionName: string, suffix: string) => getDataCss(resourceId, actionName, suffix)
