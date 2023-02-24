import type { RecordJSON } from '../../../frontend'
import type { ActionHandler, ActionResponse } from '../../actions'
import { ResourceOptions } from '../../decorators'
import { buildFeature } from '../build-feature'

export type RelationsActionResponse = ActionResponse & {
  /**
   * List of records
   */
  records: Array<RecordJSON>
}

export type RelationsFeatureOptions = {
  relations: {
    [resourceId: string]: {
      junction: {
        joinKey: string
        inverseJoinKey: string
        throughResourceId: string
      }
      target: {
        resourceId: string
      }
    }
  }
}

// TODO handle resource relations
const relationsHandler: ActionHandler<RelationsActionResponse> = (req, res, ctx) => ({
  resource: ctx.resource,
  records: [],
})

export const relationsFeature = ({ relations }: RelationsFeatureOptions) => {
  const properties: ResourceOptions['properties'] = Object.keys(relations).reduce(
    (memo, current) => ({
      ...memo,
      [current]: { type: 'string', isVisible: false },
    }),
    {},
  )

  properties.relations = {
    type: 'string',
    components: { show: 'DefaultRelationsShowProperty' },
    props: {
      relationsTargets: Object.keys(relations).reduce(
        (memo, current) => ({
          ...memo,
          [current]: relations[current].target.resourceId,
        }),
        {},
      ),
    },
    position: 999,
  }

  return buildFeature({
    properties,
    actions: {
      findRelation: {
        actionType: 'record',
        isVisible: false,
        handler: relationsHandler,
      },
    },
  })
}
