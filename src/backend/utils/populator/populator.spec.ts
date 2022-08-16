import populator from './populator'

describe('populator', () => {
  describe('empty array given as params', () => {
    it('returns empty array when no records are given', async () => {
      const records = await populator([])
      expect(records).toHaveLength(0)
    })
  })
})
