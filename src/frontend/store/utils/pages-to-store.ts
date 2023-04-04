/* eslint-disable implicit-arrow-linebreak */
import type { AdminJSOptions } from '../../../adminjs-options.interface.js'
import type { PageJSON } from '../../interfaces/index.js'

export const pagesToStore = (pages: AdminJSOptions['pages'] = {}): Array<PageJSON> =>
  Object.entries(pages).map(([key, adminPage]) => ({
    name: key,
    component: adminPage.component,
    icon: adminPage.icon,
  }))
