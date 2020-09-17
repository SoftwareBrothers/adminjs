import { NavigationProps } from '@admin-bro/design-system'
import { expect } from 'chai'
import ResourceJSON from '../../../../../backend/decorators/resource-json.interface'
import factory from '../../../spec/factory'

import groupResources from './group-resources'

describe('groupResources', () => {
  let resources: Array<ResourceJSON>
  let dashboard: ResourceJSON
  let grouped: NavigationProps['elements']
  let parent1: ResourceJSON['parent']
  let parent2: ResourceJSON['parent']

  beforeEach(async () => {
    parent1 = { name: 'Volvo', icon: 'volvo' }
    parent2 = { name: 'Audi', icon: 'audi' }
    dashboard = await factory.build<ResourceJSON>('ResourceJSON', { parent: null })

    resources = [
      await factory.build<ResourceJSON>('ResourceJSON', { parent: parent1 }),
      await factory.build<ResourceJSON>('ResourceJSON', { parent: parent1 }),
      await factory.build<ResourceJSON>('ResourceJSON', { parent: parent1 }),
      await factory.build<ResourceJSON>('ResourceJSON', { parent: parent2 }),
      dashboard,
    ]

    grouped = groupResources(resources)
  })

  it('groups nested resources into parents', async () => {
    expect(grouped.length).to.equal(3)
    expect(grouped[0].label).to.eq(parent1?.name)
    expect(grouped[1].label).to.eq(parent2?.name)
    expect(grouped[2].label).to.eq(dashboard.name)
  })

  it('moves all nested elements to given parent', () => {
    console.log({ grouped })
    console.log({ 0: grouped[0].elements })

    expect(grouped[0].elements?.length).to.eq(3)
    expect(grouped[0].elements?.[0].label).to.eq(resources[0].name)
  })
})
