import { useSelector } from 'react-redux'
import { ResourceJSON } from '../../interfaces/resource-json.interface'
import { ReduxState } from '../../store/store'

/**
 * @load ./use-resource.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @new in version 3.3
 * @bundle
 * @param {string} resourceId    Id of a resource you want to get
 */
const useResource = (resourceId: string): ResourceJSON | undefined => {
  const resources = useSelector((state: ReduxState) => state.resources)

  const foundResource = resources.find(resource => resource.id === resourceId)

  return foundResource
}

export {
  useResource as default,
  useResource,
}
