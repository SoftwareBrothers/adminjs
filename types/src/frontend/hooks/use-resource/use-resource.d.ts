import { ResourceJSON } from '../../interfaces/resource-json.interface';
/**
 * @load ./use-resource.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @bundle
 * @param {string} resourceId    Id of a resource you want to get
 */
declare const useResource: (resourceId: string) => ResourceJSON | undefined;
export { useResource as default, useResource, };
