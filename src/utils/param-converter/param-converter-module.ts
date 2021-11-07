import { DELIMITER } from './constants'
import { convertNestedParam } from './convert-nested-param'
import { convertParam } from './convert-param'
import { prepareParams } from './prepare-params'

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
