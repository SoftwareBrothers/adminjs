import { DELIMITER } from './constants.js'
import { convertNestedParam } from './convert-nested-param.js'
import { convertParam } from './convert-param.js'
import { prepareParams } from './prepare-params.js'

export type ParamConverterModuleType = {
  convertParam: typeof convertParam;
  convertNestedParam: typeof convertNestedParam;
  prepareParams: typeof prepareParams;
  DELIMITER: typeof DELIMITER;
}

export const paramConverter: ParamConverterModuleType = {
  convertParam,
  convertNestedParam,
  DELIMITER,
  prepareParams,
}
