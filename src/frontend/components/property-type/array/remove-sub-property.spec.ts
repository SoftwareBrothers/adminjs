import { expect } from 'chai'
import { RecordJSON } from '../../../interfaces'
import { removeSubProperty } from './remove-sub-property'

import factory from '../../spec/factory'

describe('removeSubProperty', () => {
  let record: RecordJSON
  let populated1: RecordJSON
  let populated2: RecordJSON

  beforeEach(async () => {
    populated1 = await factory.build<RecordJSON>('RecordJSON')
    populated2 = await factory.build<RecordJSON>('RecordJSON')
    record = await factory.build<RecordJSON>('RecordJSON', {
      params: {
        'property.0': 'val1',
        'property.1': 'val2',
        'property.2': 'val3',
        'property.3.nested.0': 'val1',
        'property.3.nested.1': 'val2',
        'property.3.nested.2': 'val2',
        'property.4': 'val3',
        'notPopulated.0': 'val1',
        'notPopulated.1': 'val2',
      },
      populated: {
        'property.0': null,
        'property.1': populated1,
        'property.2.nested.1': populated2,
      },
    })
  })

  context('remove populated record', () => {
    let updatedRecord: RecordJSON

    beforeEach(() => {
      updatedRecord = removeSubProperty(record, 'property.1')
    })

    it('removes selected, populated, property from params and adjusts the keys', () => {
      expect(updatedRecord.params).to.deep.equal({
        'property.0': 'val1',
        'property.1': 'val3',
        'property.2.nested.0': 'val1',
        'property.2.nested.1': 'val2',
        'property.2.nested.2': 'val2',
        'property.3': 'val3',
        'notPopulated.0': 'val1',
        'notPopulated.1': 'val2',
      })
    })

    it('removes populated, record, adjusts the keys and keep it unflatten', () => {
      expect(updatedRecord.populated).to.deep.equal({
        'property.0': null,
        'property.1.nested.1': populated2,
      })
    })
  })
})
