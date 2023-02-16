import { expect } from 'chai'

import populator from './populator.js'

describe('populator', () => {
  context('empty array given as params', () => {
    it('returns empty array when no records are given', async () => {
      const records = await populator([])
      expect(records).to.have.lengthOf(0)
    })
  })
})
