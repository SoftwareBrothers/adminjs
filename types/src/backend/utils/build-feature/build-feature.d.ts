import { FeatureType } from '../../../adminjs-options.interface';
import { ResourceOptions } from '../../decorators/resource/resource-options.interface';
/**
 * @name mergeResourceOptions
 * @function
 * @description
 * Merges 2 ResourceOptions together. Used by features
 *
 * - 'id', 'href', 'parent', 'sort' from `newOptions` override `oldOptions`
 * - 'listProperties', 'showProperties', 'editProperties', 'filterProperties'
 *   are joined and made unique
 * - all 'properties' from `newOptions` override properties from `oldOptions`
 * - all 'actions' with their parameters from `newOptions` override `oldOptions`
 *   except hooks and handler - which are chained.
 *
 * @param   {ResourceOptions}  oldOptions
 * @param   {ResourceOptions}  newOptions
 *
 * @return  {ResourceOptions}
 */
declare const mergeResourceOptions: (oldOptions?: ResourceOptions, newOptions?: ResourceOptions) => ResourceOptions;
/**
 * @name buildFeature
 * @function
 * @description
 * Higher Order Function which creates a feature
 *
 * @param   {ResourceOptions}  options
 *
 * @return  {FeatureType}
 * @example
 * const { buildFeature } = require('adminjs')
 *
 * const feature = buildFeature({
 *   // resource options goes here.
 * })
 */
declare const buildFeature: (options?: ResourceOptions) => FeatureType;
export { mergeResourceOptions, buildFeature };
