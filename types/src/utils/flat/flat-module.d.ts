import { flatten, unflatten } from 'flat';
import { DELIMITER } from './constants';
import { selectParams } from './select-params';
import { filterOutParams } from './filter-out-params';
import { set } from './set';
import { get } from './get';
import { merge } from './merge';
import { pathToParts } from './path-to-parts';
import { removePath } from './remove-path';
export declare type FlatModuleType = {
    flatten: typeof flatten;
    unflatten: typeof unflatten;
    set: typeof set;
    get: typeof get;
    selectParams: typeof selectParams;
    filterOutParams: typeof filterOutParams;
    DELIMITER: typeof DELIMITER;
    pathToParts: typeof pathToParts;
    removePath: typeof removePath;
    merge: typeof merge;
};
/**
 * @module flat
 * @name flat
 * @new in version 3.3
 * @load ./flat.doc.md
 */
export declare const flat: FlatModuleType;
