import { expect } from 'chai'
import factory from 'factory-girl'

import '../../../spec/record-json.factory'
import '../../../spec/action-json.factory'
import ActionJSON from '../../../../../backend/decorators/action-json.interface'
import RecordJSON from '../../../../../backend/decorators/record-json.interface'

import getBulkActionsFromRecords from './get-bulk-actions-from-records'

describe('getBulkActionsFromRecords', function () {
  context('records with 2 bulk actions', function () {
    let actions: Array<ActionJSON> = []
    let records: Array<RecordJSON>

    it('returns array of uniq bulk actions', async function () {
      actions = [
        await factory.build<ActionJSON>('ActionJSON', {
          name: 'bulkAction1',
          actionType: 'bulk',
        }),
        await factory.build<ActionJSON>('ActionJSON', {
          name: 'bulkAction2',
          actionType: 'bulk',
        }),
      ]
      records = await factory.buildMany<RecordJSON>('RecordJSON', 5, {
        bulkActions: actions,
      })

      expect(getBulkActionsFromRecords(records)).to.deep.equal(actions)
    })
  })
})
