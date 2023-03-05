import { AdminJSOptions } from '../../adminjs-options.interface'

import { PageJSON } from '../interfaces'

const pagesToStore = (pages: AdminJSOptions['pages'] = {}): Array<PageJSON> =>
  Object.entries(pages).map(([key, adminPage]) => {
    let isVisible = true;
    if (adminPage.isVisible) {
      if (typeof adminPage.isVisible === 'function') {
        isVisible = adminPage.isVisible({ currentAdmin })
      } else {
        isVisible = adminPage.isVisible
      }
    }
    return {
      name: key,
      component: adminPage.component,
      icon: adminPage.icon,
      isVisible,
    }
  });

export default pagesToStore
