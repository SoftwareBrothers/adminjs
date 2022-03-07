"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateProperty = populateProperty;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isValueSearchable = value => ['string', 'bigint', 'number'].includes(typeof value) && value !== null && value !== '';
/**
 * It populates one property in given records
 *
 * @param {Array<BaseRecord>} records   array of records to populate
 * @param {PropertyDecorator} property  Decorator for the reference property to populate
 * @private
 * @hide
 */


async function populateProperty(records, property) {
  const decoratedResource = property.resource();

  if (!records || !records.length) {
    return records;
  }

  const referencedResource = property.reference();

  if (!referencedResource) {
    throw new Error([`There is no reference resource named: "${property.property.reference}"`, `for property: "${decoratedResource.id()}.properties.${property.propertyPath}"`].join('\n'));
  } // I will describe the process for following data:
  // - decoratedResource = 'Comment'
  // - referenceResource = 'User'
  // property.path = 'userId'
  // first, we create externalIdsMap[1] = null where 1 is userId. This make keys unique and assign
  // nulls to each of them


  const externalIdsMap = records.reduce((memo, baseRecord) => {
    const foreignKeyValue = baseRecord.get(property.propertyPath, {
      includeAllSiblings: true
    }); // 2 kind of properties returning arrays
    //   - the one with the array type
    //   - the one which are nested within an arrays (fetched by the help of
    //   the options { includeAllSiblings: true } in baseRecord.get().
    // so we have to take it all into consideration

    if (Array.isArray(foreignKeyValue)) {
      return foreignKeyValue.reduce((arrayMemo, valueInArray) => _objectSpread(_objectSpread({}, arrayMemo), isValueSearchable(valueInArray) ? {
        [valueInArray]: valueInArray
      } : {}), memo);
    }

    if (!isValueSearchable(foreignKeyValue)) {
      return memo;
    }

    memo[foreignKeyValue] = foreignKeyValue;
    return memo;
  }, {});
  const uniqueExternalIds = Object.values(externalIdsMap); // when no record has reference filled (ie `userId`) = return input `records`

  if (!uniqueExternalIds.length) {
    return records;
  } // now find all referenced records: all users


  const referenceRecords = await referencedResource.findMany(uniqueExternalIds); // even if record has value for this reference - it might not have the referenced record itself
  // this happens quite often in mongodb where there are no constrains on the database

  if (!referenceRecords || !referenceRecords.length) {
    return records;
  } // now assign these users to `externalIdsMap` instead of the empty object we had. To speed up
  // assigning them to record#populated we will do in the next step by calling:
  // `externalIdsMap[id]` to get populated record instead of finding them in an array


  referenceRecords.forEach(referenceRecord => {
    // example: externalIds[1] = { ...userRecord } | null (if not found)
    const foreignKeyValue = referenceRecord.id();
    externalIdsMap[foreignKeyValue] = referenceRecord;
  });
  return records.map(record => {
    // first lets extract all the existing params from the given record which belongs to given
    // property. Usually it will be just one element, but for arrays and items nested inside arrays
    // there will be more like this for array:
    // {
    //    'professions.0': '5f7462621eb3495ea0f0edd7',
    //    'professions.1': '5f7462621eb3495ea0f0edd6',
    // }
    const referenceParams = record.selectParams(property.propertyPath, {
      includeAllSiblings: true
    }) || {}; // next we copy the exact params structure to record.populated changing the value with found
    // record

    Object.entries(referenceParams).forEach(([path, foreignKeyValueItem]) => {
      record.populate(path, externalIdsMap[foreignKeyValueItem]);
    });
    return record;
  });
}