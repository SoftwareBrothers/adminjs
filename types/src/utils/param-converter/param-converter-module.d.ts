import { DELIMITER } from './constants';
import { convertNestedParam } from './convert-nested-param';
import { convertParam } from './convert-param';
import { prepareParams } from './prepare-params';
export declare type ParamConverterModuleType = {
    convertParam: typeof convertParam;
    convertNestedParam: typeof convertNestedParam;
    prepareParams: typeof prepareParams;
    DELIMITER: typeof DELIMITER;
};
export declare const paramConverter: ParamConverterModuleType;
