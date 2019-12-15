import { expect } from 'chai'

import updateParamsArray from './update-params-array'

describe('updateParamsArray', () => {
  context('nested array', function () {
    beforeEach(function () {
      this.params = {
        someOther: 'field',
        'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
        'Item.0.imageVariants.0.imageURL': 'url to help',
        'Item.0.imageVariants.0.isApproved': true,
        'Item.0.imageVariants.0.isDeleted': false,
        'Item.0.imageVariants.1.dateCreated': '2019-09-19T19:10:34.919Z',
        'Item.0.imageVariants.1.imageURL': 'url 2',
      }
      this.propertyPath = 'Item.0.imageVariants'
      this.newArray = [{
        dateCreated: '2019-09-19T19:10:34.919Z',
        imageURL: 'url 2',
      }]
      this.result = updateParamsArray(this.params, this.propertyPath, this.newArray)
    })

    it('updates nested array with given values', function () {
      expect(this.result).to.deep.equal({
        someOther: 'field',
        'Item.0.imageVariants.0.dateCreated': '2019-09-19T19:10:34.919Z',
        'Item.0.imageVariants.0.imageURL': 'url 2',
      })
    })
  })
})
