import { ParamsTypeValue } from '../../backend/adapters/record/params.type';
import { BaseProperty } from '../../backend/adapters/property';
import PropertyDecorator from '../../backend/decorators/property/property-decorator';
declare const isNumeric: (value: ParamsTypeValue) => boolean;
declare const isUuid: (value: ParamsTypeValue) => boolean;
declare const isSafeInteger: (value: ParamsTypeValue) => boolean;
declare const validateParam: (value: ParamsTypeValue, property: BaseProperty | PropertyDecorator) => boolean;
export { validateParam, isNumeric, isUuid, isSafeInteger };
