import { ResourceOptions } from 'admin-bro'
import { ContentParent } from '../../parents'

export const BlogPostResource: ResourceOptions = {
  parent: ContentParent,
  properties: {
    meta: {
      type: 'string',
      isArray: true,
    },
  },
}
