/**
 * @alias ParamsTypeValue
 * @memberof BaseRecord
 */
export type ParamsTypeValue = string | number | boolean | null | undefined | [] | {} | File


/**
 * @alias ParamsType
 * @memberof BaseRecord
 */
export type ParamsType = Record<string, any>
// TODO: change ^^^any to ParamsTypeValue
