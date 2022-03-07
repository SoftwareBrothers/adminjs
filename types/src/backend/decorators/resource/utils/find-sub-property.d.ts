import PropertyDecorator from '../../property/property-decorator';
import { PathParts } from '../../../../utils/flat/path-parts.type';
/**
 * @private
 *
 * @param   {PathParts}  pathParts    parts returned by `pathToParts` method
 * @param   {PropertyDecorator}       rootProperty where function should recursively search for
 *                                    a subProperty matching one of the pathParts
 *
 * @return  {PropertyDecorator | null}  found subProperty
 */
export declare const findSubProperty: (pathParts: PathParts, rootProperty: PropertyDecorator) => PropertyDecorator | null;
