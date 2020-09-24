import { AdminBroOptions } from '../../admin-bro-options.interface'

import { PageJSON } from '../interfaces'

const pagesToStore = (pages: AdminBroOptions['pages'] = {}): Array<PageJSON> => Object.entries(pages)
  .map(([key, adminPage]) => ({
    name: key,
    component: adminPage.component,
    icon: adminPage.icon,
  }))

export default pagesToStore
