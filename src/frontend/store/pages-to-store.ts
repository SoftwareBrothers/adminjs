import { AdminPage } from '../../admin-bro-options.interface'
import PageJSON from '../../backend/decorators/page-json.interface'

const pagesToStore = (pages: Record<string, AdminPage>): Array<PageJSON> => {
  const pagesArray = Object.entries(pages).map(([key, adminPage]) => ({
    name: key,
    component: adminPage.component,
  }))
  return pagesArray
}

export default pagesToStore
