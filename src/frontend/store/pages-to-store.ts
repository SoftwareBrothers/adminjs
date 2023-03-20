import { AdminJSOptions } from '../../adminjs-options.interface.js'
import { PageJSON } from '../interfaces/index.js'

const pagesToStore = (pages: AdminJSOptions['pages'] = {}): Array<PageJSON> => Object.entries(pages)
  .map(([key, adminPage]) => ({
    name: key,
    component: adminPage.component,
    icon: adminPage.icon,
  }))

export default pagesToStore
