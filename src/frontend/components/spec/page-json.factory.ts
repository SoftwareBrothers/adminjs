import factory from 'factory-girl'

import { PageJSON } from '../../interfaces/index.js'

factory.define<PageJSON>('PageJSON', Object, {
  name: factory.sequence('PageJSON.name', (n) => `page${n}`),
  component: factory.sequence('PageJSON.component', (n) => `Component${n}`),
})
