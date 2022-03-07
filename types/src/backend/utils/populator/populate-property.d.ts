import { BaseRecord } from '../../adapters';
import PropertyDecorator from '../../decorators/property/property-decorator';
/**
 * It populates one property in given records
 *
 * @param {Array<BaseRecord>} records   array of records to populate
 * @param {PropertyDecorator} property  Decorator for the reference property to populate
 * @private
 * @hide
 */
export declare function populateProperty(records: Array<BaseRecord> | null, property: PropertyDecorator): Promise<Array<BaseRecord> | null>;
